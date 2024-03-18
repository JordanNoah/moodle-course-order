import {ProgramMigrationDatasource} from "../../domain/datasources/programMigration.datasource";
import {RegisterProgramMigrationDto} from "../../domain/dtos/registerProgramMigration.dto";
import {ProgramMigrationEntity} from "../../domain/entities/programMigration.entity";
import {CustomError} from "../../domain/errors/custom.error";
import {ProgramMigrationSequelize} from "../database/models/ProgramMigration";

export class ProgramMigrationDatasourceImpl implements ProgramMigrationDatasource{
    async register(registerProgramMigrationDto: RegisterProgramMigrationDto): Promise<ProgramMigrationEntity> {
        try {
            const {
                programAbbreviation,
                version
            } = registerProgramMigrationDto

            const [programMigrationDb, created] = await ProgramMigrationSequelize.findOrCreate(
                {
                    where:{
                        version:version,
                        programAbbreviation:programAbbreviation
                    },
                    defaults:{
                        version:version,
                        programAbbreviation:programAbbreviation
                    }
                }
            )

            return programMigrationDb
        } catch (error) {
            if(error instanceof CustomError){
                throw error
            }
            throw CustomError.internalSever()
        }
    }
}