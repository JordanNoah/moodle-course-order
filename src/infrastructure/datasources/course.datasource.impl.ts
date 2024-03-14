import {CourseDatasource} from "../../domain/datasources/course.datasource";
import {RegisterCourseDto} from "../../domain/dtos/registerCourse.dto";
import {CourseEntity} from "../../domain/entities/course.entity";
import {CustomError} from "../../domain/errors/custom.error";
import {CourseSequelize} from "../database/models/Course";

export class CourseDatasourceImpl implements CourseDatasource {
    async register(registerCourseDto: RegisterCourseDto): Promise<CourseEntity> {
        try {
            const {
                fullName,
                shortName,
                version,
                type,
                idNumber
            } = registerCourseDto

            const [course ,created] = await CourseSequelize.findOrCreate({
                where:{
                    idNumber:idNumber
                },
                defaults:{
                    type:type,
                    fullName:fullName,
                    shortName:shortName,
                    version:version,
                    idNumber:idNumber
                }
            })

            return course
        } catch (error) {
            if(error instanceof CustomError){
                throw error
            }
            throw CustomError.internalSever()
        }
    }
}