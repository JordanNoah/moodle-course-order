import {AcademicProgramDto} from "./academicProgram.dto";
import {IntroductoryModuleDto} from "./introductoryModule.dto";
import {DegreeDto} from "./degree.dto";
import {EnrollmentDto} from "./enrollment.dto";

export class InscriptionDto {
    private constructor(
        public uuid:string,
        public referenceId:number,
        public language:string,
        public createdAt:Date,
        public registeredAt:Date,
        public startedAt:Date,
        public finishedAt:Date,
        public extensionFinishedAt:Date,
        public status:string,
        public incidence:string,
        public academicProgram:AcademicProgramDto,
        public introductoryModule:IntroductoryModuleDto[],
        public institutionAbbreviation:string,
        public degrees:DegreeDto[],
        public modality:string,
        public active:boolean,
        public enrollments:EnrollmentDto[]
    ) {}

    static create(object:{[key:string]:any}):[string?,InscriptionDto?] {
        const {
            uuid,
            reference_id,
            language,
            created_at,
            registered_at,
            started_at,
            finished_at,
            extension_finished_at,
            status,
            incidence,
            academic_program,
            introductory_module,
            institution_abbreviation,
            degrees,
            modality,
            active,
            enrollments
        } = object

        if(!uuid) return ['Missing uuid in inscription structure']
        //if(!active) return ['Missing active in inscription structure']

        let introductoryModuleDtos: IntroductoryModuleDto[] = []

        for (let i = 0; i < introductory_module.length; i++) {
            const [error,introductoryModuleDto] = IntroductoryModuleDto.create(introductory_module[i])
            if (error) return [error]
            introductoryModuleDtos.push(introductoryModuleDto!)
        }

        const [error, academicProgramDto] = AcademicProgramDto.create(academic_program)
        if (error) return [error]

        let degreesDtoArray: DegreeDto[] = []
        for (let i = 0; i < degrees.length; i++) {
            const [error,degreeDto] = DegreeDto.create(degrees[i])
            if (error) return [error]
            degreesDtoArray.push(degreeDto!)
        }

        let enrollmentDtoArray: EnrollmentDto[] = []
        for (let i = 0; i < enrollments.length; i++) {
            const [error, enrollmentDto] = EnrollmentDto.create(enrollments[i])
            if (error) return [error]
            enrollmentDtoArray.push(enrollmentDto!)
        }

        return [
            undefined,
            new InscriptionDto(
                uuid,
                reference_id,
                language,
                created_at,
                registered_at,
                started_at,
                finished_at,
                extension_finished_at,
                status,
                incidence,
                academicProgramDto!,
                introductoryModuleDtos,
                institution_abbreviation,
                degreesDtoArray,
                modality,
                active,
                enrollmentDtoArray
            )
        ]
    }
}