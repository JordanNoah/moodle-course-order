import {GroupCourseDatasource} from "../../domain/datasources/groupCourse.datasource";
import {RegisterCourseGroupDto} from "../../domain/dtos/registerCourseGroup.dto";
import {GroupCourseEntity} from "../../domain/entities/groupCourse.entity";
import {CustomError} from "../../domain/errors/custom.error";
import {GroupCourseSequelize} from "../database/models/GroupCourse";
import {GroupSequelize} from "../database/models/Group";

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

    async removeByIdGroup(idGroup: number): Promise<boolean> {
        try {
            const removed = await GroupCourseSequelize.destroy({
                where:{
                    idGroup:idGroup
                }
            })
            return true
        } catch (error) {
            if(error instanceof CustomError){
                throw error
            }
            throw CustomError.internalSever()
        }
    }

    async getByIdGroup(idGroup: number): Promise<GroupCourseEntity[]> {
        try {
            return await GroupCourseSequelize.findAll({
                where:{
                    idGroup:idGroup
                }
            })
        } catch (error) {
            if(error instanceof CustomError){
                throw error
            }
            throw CustomError.internalSever()
        }
    }
}