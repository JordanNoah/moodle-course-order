export class AcademicProgramDto {
    private constructor(
        public uuid: string,
        public referenceId: number,
        public type:string,
        public abbreviation:string,
        public language:string,
        public name:string,
        public version:string
    ) {}

    static create(object: {[key:string]:any}):[string?, AcademicProgramDto?] {
        const {
            uuid,
            reference_id,
            type,
            abbreviation,
            language,
            name,
            version
        } = object

        if(!uuid) return ['Missing uuid in academic_program structure']
        if(!version) return ['Missing version in academic_program structure']

        return [
            undefined,
            new AcademicProgramDto(
                uuid,
                reference_id,
                type,
                abbreviation,
                language,
                name,
                version
            )
        ]
    }
}