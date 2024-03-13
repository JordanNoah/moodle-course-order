export class AcademicElementDto {
    private constructor(
        public uuid:string,
        public referenceId:number,
        public referenceClass:string,
        public referenceType:string,
        public type:string,
        public name:string,
        public abbreviation:string,
        public language:string | null,
        public version:string
    ) {}

    static create(object: {[key:string]:any}):[string?,AcademicElementDto?]{
        const {
            uuid,
            reference_id,
            reference_class,
            reference_type,
            type,
            name,
            abbreviation,
            language,
            version
        } = object

        return [
            undefined,
            new AcademicElementDto(
                uuid,
                reference_id,
                reference_class,
                reference_type,
                type,
                name,
                abbreviation,
                language,
                version
            )
        ]
    }
}