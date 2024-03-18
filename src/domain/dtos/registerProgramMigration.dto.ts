export class RegisterProgramMigrationDto {
    private constructor(
        public programAbbreviation: string,
        public version: string
    ) {}

    static create(object: {[key:string]:any}):[string?,RegisterProgramMigrationDto?]{
        const {
            program_abbreviation,
            version
        } = object

        return [
            undefined,
            new RegisterProgramMigrationDto(
                program_abbreviation,
                version
            )
        ]
    }
}