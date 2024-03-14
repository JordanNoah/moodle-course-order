import {UserDatasource} from "../../domain/datasources/user.datasource";
import {StudentDto} from "../../domain/dtos/process/student.dto";
import {UserEntity} from "../../domain/entities/user.entity";
import {CustomError} from "../../domain/errors/custom.error";
import {UserSequelize} from "../database/models/User";
import {OrganizationDatasourceImpl} from "./organization.datasource.impl";
import {RegisterStudentDto} from "../../domain/dtos/registerStudent.dto";

export class UserDatasourceImpl implements UserDatasource {
    async register(studentDto: RegisterStudentDto): Promise<UserEntity> {
        try {
            const {
                firstName,
                lastName,
                email,
                idNumber,
                userName,
                language,
                password,
                phone,
                address,
                uuid,
                referenceId,
                organizationId
            } = studentDto

            const [student,created] = await UserSequelize.findOrCreate({
                where:{
                    idNumber:idNumber,
                    idOrganization:organizationId
                },
                defaults:{
                    idNumber:idNumber,
                    email:email,
                    lastName:lastName,
                    firstName:firstName,
                    idOrganization:organizationId
                }
            })

            return student
        }catch (error){
            if(error instanceof CustomError){
                throw error
            }
            throw CustomError.internalSever()
        }
    }
}