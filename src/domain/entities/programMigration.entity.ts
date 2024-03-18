export class ProgramMigrationEntity {
    constructor(
        public id: number,
        public programAbbreviation: string,
        public version: string,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}