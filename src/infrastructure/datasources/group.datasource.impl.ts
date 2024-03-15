import {GroupDatasource} from "../../domain/datasources/group.datasource";
import {GroupEntity} from "../../domain/entities/group.entity";
import {RegisterGroupDto} from "../../domain/dtos/registerGroup.dto";
import {CustomError} from "../../domain/errors/custom.error";
import {GroupSequelize} from "../database/models/Group";

export class GroupDatasourceImpl implements GroupDatasource {
    async register(registerGroupDto: RegisterGroupDto): Promise<GroupEntity> {
        try {
            const {
                type,
                name,
                shortname,
                idUser
            } = registerGroupDto

            const [group, created] = await GroupSequelize.findOrCreate({
                where:{
                    idUser:idUser,
                    type:type,
                    shortname:shortname
                },
                defaults:{
                    idUser:idUser,
                    type:type,
                    shortname:shortname,
                    name:name
                }
            })

            return group
        } catch (error) {
            if(error instanceof CustomError){
                throw error
            }
            throw CustomError.internalSever()
        }
    }

    async getByIdUserAndType(idUser: number, typeGroup: string): Promise<GroupEntity|null> {
        try {
            return await GroupSequelize.findOne({
                where:{
                    idUser:idUser,
                    type:typeGroup
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