import {GroupCourseDatasource} from "../../domain/datasources/groupCourse.datasource";
import {RegisterCourseGroupDto} from "../../domain/dtos/registerCourseGroup.dto";
import {GroupCourseEntity} from "../../domain/entities/groupCourse.entity";
import {CustomError} from "../../domain/errors/custom.error";
import {GroupCourseSequelize} from "../database/models/GroupCourse";

export class GroupCourseDatasourceImpl extends GroupCourseDatasource {
    async register(registerCourseGroupDto: RegisterCourseGroupDto): Promise<GroupCourseEntity> {
        try {
            const {
                idGroup,
                idCourse,
                order
            } = registerCourseGroupDto

            const [groupCourse,created] = await GroupCourseSequelize.findOrCreate({
                where:{
                    idGroup:idGroup,
                    idCourse:idCourse
                },
                defaults:{
                    idCourse:idCourse,
                    idGroup:idGroup,
                    order:order
                }
            })

            return groupCourse
        } catch (error) {
            if(error instanceof CustomError){
                throw error
            }
            throw CustomError.internalSever()
        }
    }
}