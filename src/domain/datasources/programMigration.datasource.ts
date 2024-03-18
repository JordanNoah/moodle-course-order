import {RegisterProgramMigrationDto} from "../dtos/registerProgramMigration.dto";
import {ProgramMigrationEntity} from "../entities/programMigration.entity";

export abstract class ProgramMigrationDatasource {
    abstract register(registerProgramMigrationDto:RegisterProgramMigrationDto): Promise<ProgramMigrationEntity>
}