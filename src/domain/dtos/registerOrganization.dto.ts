export class RegisterOrganizationDto {
    private constructor(
        public uuid: string,
        public name: string,
        public fullname: string,
        public abbreviation: string,
        public domain: string,
        public token: string,
        public website: string,
        public rest_path: string,
        public modality: string,
        public additional_data: string,
        public translations: string
    ) {}

    static create(object: {[key:string]:any}):[string?,RegisterOrganizationDto?]{
        const {
            uuid,
            name,
            fullname,
            abbreviation,
            domain,
            token,
            website,
            rest_path,
            modality,
            additional_data,
            translations
        } = object

        if (!abbreviation) return ['Missing abbreviation in structure']
        if (!modality) return ['Missing modality in structure']
        if (!name) return ['Missing name in structure']


        return [
            undefined,
            new RegisterOrganizationDto(
                uuid,
                name,
                fullname,
                abbreviation,
                domain,
                token,
                website,
                rest_path,
                modality,
                additional_data,
                translations
            )
        ]
    }
}