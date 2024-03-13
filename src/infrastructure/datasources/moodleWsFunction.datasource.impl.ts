import {MoodleWsFunctionDatasource} from "../../domain/datasources/moodleWsFunction.datasource";
import {RegisterMoodleWsFunctionDto} from "../../domain/dtos/registerMoodleWsFunction.dto";
import {MoodleWsFunctionEntity} from "../../domain/entities/moodleWsFunction.entity";
import {CustomError} from "../../domain/errors/custom.error";
import {MoodleWsFunctionSequelize} from "../database/models/MoodleWsFunction";
import {UpdateMoodleWsFunctionDto} from "../../domain/dtos/updateMoodleWsFunction.dto";

export class MoodleWsFunctionDatasourceImpl implements MoodleWsFunctionDatasource {
    async register(registerMoodleWsFunctionDto: RegisterMoodleWsFunctionDto): Promise<MoodleWsFunctionEntity> {
        try {
            const {
                moodleFunction,
                abbreviation
            } = registerMoodleWsFunctionDto

            const [moodleWsFunction, created] = await MoodleWsFunctionSequelize.findOrCreate({
                where:{
                    abbreviation: abbreviation
                },
                defaults:{
                    wsFunction:moodleFunction,
                    abbreviation:abbreviation
                }
            })

            return moodleWsFunction
        } catch (error) {
            if(error instanceof CustomError){
                throw error
            }
            throw CustomError.internalSever()
        }
    }

    async update(updateMoodleWsFunctionDto:UpdateMoodleWsFunctionDto): Promise<MoodleWsFunctionEntity> {
        try {
            let wsFunction = await this.getById(updateMoodleWsFunctionDto.id)

            if(!wsFunction) throw CustomError.notFound('Ws not found')

            await MoodleWsFunctionSequelize.update({
                wsFunction: updateMoodleWsFunctionDto.moodleFunction,
                abbreviation: updateMoodleWsFunctionDto.abbreviation
            },{
                where:{
                    id: updateMoodleWsFunctionDto.id
                }
            })

            wsFunction.wsFunction = updateMoodleWsFunctionDto.moodleFunction
            wsFunction.abbreviation = updateMoodleWsFunctionDto.abbreviation
            return wsFunction
        } catch (error) {
            if(error instanceof CustomError){
                throw error
            }
            throw CustomError.internalSever()
        }
    }

    async getById(id:number): Promise<MoodleWsFunctionEntity | null> {
        try {
            return await MoodleWsFunctionSequelize.findOne({
                where:{
                    id:id
                }
            })
        } catch (error) {
            if(error instanceof CustomError){
                throw error
            }
            throw CustomError.internalSever()
        }
    }

    async getAll(): Promise<MoodleWsFunctionEntity[]> {
        try {
            return await MoodleWsFunctionSequelize.findAll()
        } catch (error) {
            if(error instanceof CustomError){
                throw error
            }
            throw CustomError.internalSever()
        }
    }

    async getByAbbreviation(abbreviation:string): Promise<MoodleWsFunctionEntity | null> {
        try {
            return await MoodleWsFunctionSequelize.findOne({
                where:{
                    abbreviation:abbreviation
                }
            })
        } catch (error) {
            if(error instanceof CustomError){
                throw error
            }
            throw CustomError.internalSever()
        }
    }

    async deleteById(id:number): Promise<MoodleWsFunctionEntity> {
        try {
            let wsFunction = await this.getById(id)

            if(!wsFunction) throw CustomError.notFound('Ws not found')

            await MoodleWsFunctionSequelize.destroy({
                where:{
                    id:wsFunction.id
                }
            })

            return wsFunction
        } catch (error) {
            if(error instanceof CustomError){
                throw error
            }
            throw CustomError.internalSever()
        }
    }

    async deleteByAbbreviation(abbreviation:string): Promise<MoodleWsFunctionEntity> {
        try {
            let wsFunction = await this.getByAbbreviation(abbreviation)

            if(!wsFunction) throw CustomError.notFound('Ws not found')

            await MoodleWsFunctionSequelize.destroy({
                where:{
                    id:wsFunction.id
                }
            })

            return wsFunction
        } catch (error) {
            if(error instanceof CustomError){
                throw error
            }
            throw CustomError.internalSever()
        }
    }
}