import {UserDatasource} from "../../domain/datasources/user.datasource";
import {StudentDto} from "../../domain/dtos/process/student.dto";
import {UserEntity} from "../../domain/entities/user.entity";
import {CustomError} from "../../domain/errors/custom.error";
import {UserSequelize} from "../database/models/User";
import {OrganizationDatasourceImpl} from "./organization.datasource.impl";

export class UserDatasourceImpl implements UserDatasource {
    async register(studentDto: StudentDto): Promise<UserEntity> {
        try {
            const {
                firstName,
                lastName,
                email,
                dni,
                institutionAbbreviation
            } = studentDto

            return new UserEntity(1,'','','','',1,new Date(),new Date(),new Date())
        }catch (error){
            if(error instanceof CustomError){
                throw error
            }
            throw CustomError.internalSever()
        }
    }
}