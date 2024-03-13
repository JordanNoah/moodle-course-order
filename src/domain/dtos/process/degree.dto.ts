export class DegreeDto {
    private constructor(
        public referenceId:number,
        public abbreviation:string,
        public status:string,
        public incidence:string,
        public active:boolean
    ) {}

    static create(object: {[key:string]:any}):[string?, DegreeDto?] {
        const {
            reference_id,
            abbreviation,
            status,
            incidence,
            active
        } = object

        if(!active) return ['Missing active in degrees structure']

        return [
            undefined,
            new DegreeDto(
                reference_id,
                abbreviation,
                status,
                incidence,
                active
            )
        ]
    }
}