import {InscriptionDto} from "./inscription.dto";

export class StudentDto {
    private constructor(
        public uuid:string,
        public referenceId:number,
        public dni:string,
        public firstName:string,
        public lastName:string,
        public userName:string,
        public password:string,
        public email:string,
        public phone:string,
        public address:string,
        public language:string,
        public institutionAbbreviation:string,
        public createdAt:Date,
        public inscriptions:InscriptionDto[]
    ) {}

    static create(object:{[key:string]:any}):[string?,StudentDto?]{
        const {
            uuid,
            reference_id,
            dni,
            first_name,
            last_name,
            user_name,
            password,
            email,
            phone,
            address,
            language,
            institution_abbreviation,
            created_at,
            inscriptions
        } = object

        let inscriptionsDto: InscriptionDto[] = []
        for (let i = 0; i < inscriptions.length; i++) {
            const [error, inscriptionDto] = InscriptionDto.create(inscriptions[i])
            if (error) return [error]
            inscriptionsDto.push(inscriptionDto!)
        }

        if (!uuid) return ['Missing uuid in student structure']

        return [
            undefined,
            new StudentDto(
                uuid,
                reference_id,
                dni,
                first_name,
                last_name,
                user_name,
                password,
                email,
                phone,
                address,
                language,
                institution_abbreviation,
                created_at,
                inscriptionsDto
            )
        ]
    }
}