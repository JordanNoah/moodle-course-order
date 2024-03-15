import {ProcessDto} from "../../domain/dtos/process/process.dto";
import {RegisterCourseDto} from "../../domain/dtos/registerCourse.dto";
import {CustomError} from "../../domain/errors/custom.error";
import {CourseDatasourceImpl} from "../datasources/course.datasource.impl";
import {RegisterGroupDto} from "../../domain/dtos/registerGroup.dto";
import {StudentDto} from "../../domain/dtos/process/student.dto";
import {RegisterStudentDto} from "../../domain/dtos/registerStudent.dto";
import {UserDatasourceImpl} from "../datasources/user.datasource.impl";
import {DegreeDto} from "../../domain/dtos/process/degree.dto";
import {OrganizationDatasourceImpl} from "../datasources/organization.datasource.impl";
import {or} from "sequelize";
import {GroupDatasourceImpl} from "../datasources/group.datasource.impl";
import {GroupCourseSequelize} from "../database/models/GroupCourse";
import {GroupCourseDatasourceImpl} from "../datasources/groupCourse.datasource.impl";
import {GroupCourseDatasource} from "../../domain/datasources/groupCourse.datasource";
import {RegisterCourseGroupDto} from "../../domain/dtos/registerCourseGroup.dto";
import {InscriptionDto} from "../../domain/dtos/process/inscription.dto";
import {UserEntity} from "../../domain/entities/user.entity";
import {GroupEntity} from "../../domain/entities/group.entity";

interface userToCreate {
    firstName: string,
    lastName: string,
    email: string,
    idNumber: string,
}

interface organizationToUse {
    organizationAbbreviation:string,
    modality:string
}

interface stuffToDo {
    user: userToCreate,
    organization: organizationToUse
    courses:[]
}

export class Process {
     public async run(processDto:ProcessDto){
        try {
            for (let i = 0; i < processDto.student.inscriptions.length; i++) {
                let inscription = processDto.student.inscriptions[i]
                const enrollments = inscription.enrollments;

                const onlyDownGrade = await this.isOnlyDownGrade(inscription.degrees)

                const finalOrganization = await this.finalOrganizationByDegrees(inscription.degrees,inscription.modality,onlyDownGrade)


                    const userDto = new RegisterStudentDto(
                        processDto.student.uuid,
                        processDto.student.referenceId,
                        processDto.student.dni,
                        processDto.student.firstName,
                        processDto.student.lastName,
                        processDto.student.userName,
                        processDto.student.password,
                        processDto.student.email,
                        processDto.student.phone,
                        processDto.student.address,
                        processDto.student.language,
                        finalOrganization!.id
                    )

                    const user = await new UserDatasourceImpl().register(userDto)

                    for (let j = 0; j < enrollments.length; j++) {
                        const enrollment = enrollments[j]
                        let academicProgram: RegisterCourseDto = new RegisterCourseDto(
                            `${enrollment.academicProgram.uuid}||${enrollment.academicProgram.version}`,
                            `${enrollment.academicProgram.version}`,
                            `${enrollment.academicProgram.name}`,
                            `${enrollment.academicProgram.type}`,
                            `${enrollment.academicProgram.version}`
                        )


                        const academicElements = enrollment.academicSelections.flatMap(
                            selection => selection.academicElements)

                        let courseElement:RegisterCourseDto[] = academicElements.map(element => ({
                            idNumber:`${element.uuid}||${element.version}`,
                            shortName:`${element.version}`,
                            fullName:`${element.name}`,
                            type:`${element.type}`,
                            version:`${element.version}`
                        }))

                        courseElement.unshift(academicProgram)


                        const groupInduction = await new GroupDatasourceImpl().getByIdUserAndType(user.id,'Induction')

                        if (!onlyDownGrade) {
                            if (groupInduction){
                                await new GroupCourseDatasourceImpl().removeByIdGroup(groupInduction.id)
                                await new GroupDatasourceImpl().removeByIdUserAndShortname(user.id,groupInduction.shortname)
                                await this.createdOrGetInductionGroup(inscription,user)
                            }else{
                                await this.createdOrGetInductionGroup(inscription,user)
                            }
                        } else {
                            if(groupInduction){
                                await new GroupCourseDatasourceImpl().removeByIdGroup(groupInduction.id)
                                await new GroupDatasourceImpl().removeByIdUserAndShortname(user.id,groupInduction.shortname)
                            }
                        }

                        const groupProgram = await new GroupDatasourceImpl().getByIdUserAndType(user.id,'Program')
                        if (!onlyDownGrade) {
                            if (groupProgram) {
                                await new GroupCourseDatasourceImpl().removeByIdGroup(groupProgram.id)
                                await new GroupDatasourceImpl().removeByIdUserAndShortname(user.id,groupProgram.shortname)
                                await this.createdOrGetProgramGroup(courseElement,user)
                            } else {
                                await this.createdOrGetProgramGroup(courseElement,user)
                            }
                        } else {
                            if (groupProgram){
                                await new GroupCourseDatasourceImpl().removeByIdGroup(groupProgram.id)
                                await new GroupDatasourceImpl().removeByIdUserAndShortname(user.id,groupProgram.shortname)
                            }
                        }
                    }

            }
        } catch (error) {
            console.log(error)
            if(error instanceof CustomError){
                throw error
            }
            throw CustomError.internalSever()
        }
    }

    public async finalOrganizationByDegrees(degrees:DegreeDto[],modality:string,onlyDownGrade:boolean){
        let organization;
        if (!onlyDownGrade){
            let degree = degrees.find(el => el.active)

            organization = await new OrganizationDatasourceImpl().getByAbbreviationAndModality(degree!.abbreviation,modality)
            console.log(degree)
            if (!organization?.available){
                organization = await new OrganizationDatasourceImpl().getById(organization!.parent)
            }
        }else {
            let degree = degrees[0]

            organization = await new OrganizationDatasourceImpl().getByAbbreviationAndModality(degree!.abbreviation,modality)
            if (!organization?.available){
                organization = await new OrganizationDatasourceImpl().getById(organization!.parent)
            }
        }

        console.log(organization)
        return organization
    }

    public async isOnlyDownGrade(degrees:DegreeDto[]){
         if (degrees.length > 1){
             let degree = degrees.find(el => el.active)
             return !!(degree!);
         } else {
             return (!degrees[0].active)
         }
    }

    public async createdOrGetInductionGroup(inscription:InscriptionDto, user:UserEntity) {
        const introductoryModules = inscription.introductoryModule.map((element)=>{
            return new RegisterCourseDto(
                `${element.uuid}||${element.version}`,
                `${element.version}`,
                `${element.name}`,
                `${element.type}`,
                `${element.version}`
            )
        })

        if(introductoryModules.length > 0){
            const groupDto = new RegisterGroupDto(
                user.id,
                `Induction`,
                `Induction`,
                `Induction`
            )

            const group = await new GroupDatasourceImpl().register(groupDto)

            const academicElements = inscription.introductoryModule.flatMap(intModule => intModule.academicElement.flatMap((academicElement)=>{
                return new RegisterCourseDto(
                    `${academicElement.uuid}||${academicElement.version}`,
                    `${academicElement.version}`,
                    `${academicElement.name}`,
                    `Induction`,
                    `${academicElement.version}`
                )
            }))

            for (let k = 0; k < academicElements.length; k++) {
                const academicElement = academicElements[k]
                let courseEntity = await new CourseDatasourceImpl().register(academicElement)
                const groupCourseDto = new RegisterCourseGroupDto(
                    group.id,
                    courseEntity.id,
                    k
                )
                await new GroupCourseDatasourceImpl().register(groupCourseDto)
            }
        }
    }

    public async createdOrGetProgramGroup(courseElement:RegisterCourseDto[],user:UserEntity){
        let groupProgram;
        for (let k = 0; k < courseElement.length; k++) {
            let element = courseElement[k];
            let courseEntity = await new CourseDatasourceImpl().register(element)

            if (courseEntity.type == "Program") {
                const groupDto = new RegisterGroupDto(
                    user.id,
                    `Program`,
                    `${courseEntity.fullName}`,
                    `${courseEntity.shortName}`
                )

                groupProgram = await new GroupDatasourceImpl().register(groupDto)
            }

            if (groupProgram != undefined){
                const groupCourseDto = new RegisterCourseGroupDto(
                    groupProgram.id,
                    courseEntity.id,
                    k
                )
                await new GroupCourseDatasourceImpl().register(groupCourseDto)
            }
        }
    }
}