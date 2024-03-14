import {ProcessDto} from "../../domain/dtos/process/process.dto";
import {RegisterCourseDto} from "../../domain/dtos/registerCourse.dto";
import {CustomError} from "../../domain/errors/custom.error";
import {CourseDatasourceImpl} from "../datasources/course.datasource.impl";
import {RegisterGroupDto} from "../../domain/dtos/registerGroup.dto";
import {StudentDto} from "../../domain/dtos/process/student.dto";
import {RegisterStudentDto} from "../../domain/dtos/registerStudent.dto";
import {UserDatasourceImpl} from "../datasources/user.datasource.impl";

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

                    for (let k = 0; k < courseElement.length; k++) {
                        let element = courseElement[k];
                        let courseEntity = await new CourseDatasourceImpl().register(element)
                        if (courseEntity.type == "program") {
                            const group = new RegisterGroupDto(
                                ``,
                                ``,
                                ``,
                                ``
                            )
                        }
                    }
                }
            }
        } catch (error) {
            if(error instanceof CustomError){
                throw error
            }
            throw CustomError.internalSever()
        }
    }
}