import ProgramMigrationSeederData from "../data/programMigration.seeder.data";
import {RegisterProgramMigrationDto} from "../../../../domain/dtos/registerProgramMigration.dto";
import {ProgramMigrationDatasourceImpl} from "../../../datasources/programMigration.datasource.impl";
import {ProgramMigrationSequelize} from "../../models/ProgramMigration";

export class ProgramMigrationSeederExec {
    public async up() {
        const programSeeder = ProgramMigrationSeederData.flatMap(item => {
            return item.versions.map(version => ({
                program_abbreviation: item.program_abbreviation,
                version: version
            }))
        });

        for (let i = 0; i < programSeeder.length; i++) {
            const [error,programMigrationDto] = RegisterProgramMigrationDto.create(programSeeder[i])
            await new ProgramMigrationDatasourceImpl().register(programMigrationDto!)
        }
    }
    public async down(){
        await ProgramMigrationSequelize.sync({force:true})
    }
}