import {AcademicSelectionDto} from "./academicSelection.dto";
import {AcademicProgramDto} from "./academicProgram.dto";
import {AcademicTermDto} from "./academicTerm.dto";

export class EnrollmentDto {
    private constructor(
        public uuid:string,
        public referenceId:number,
        public language:string,
        public startedAt:Date,
        public academicProgram:AcademicProgramDto,
        public academicTerm:AcademicTermDto,
        public academicSelections:AcademicSelectionDto[]
    ) {}

    static create(object: {[key:string]: any}):[string?, EnrollmentDto?]{
        const {
            uuid,
            reference_id,
            language,
            started_at,
            academic_program,
            academic_term,
            academic_selections
        } = object

        if(!started_at) return ['Missing started_at in enrollment structure']

        const [errorAcademicProgram, academicProgramDto] = AcademicProgramDto.create(academic_program)
        if(errorAcademicProgram) return [errorAcademicProgram]

        const [errorAcademicTerm, academicTermDto] = AcademicTermDto.create(academic_term)
        if (errorAcademicTerm) return [errorAcademicTerm]

        let academicSelectionDtoArray: AcademicSelectionDto[] = []

        for (let i = 0; i < academic_selections.length; i++) {
            const [errorAcademicSelection, academicSelectionDto] = AcademicSelectionDto.create(academic_selections[i])
            if (errorAcademicSelection) return [errorAcademicSelection]
            academicSelectionDtoArray.push(academicSelectionDto!)
        }

        return [
            undefined,
            new EnrollmentDto(
                uuid,
                reference_id,
                language,
                started_at,
                academicProgramDto!,
                academicTermDto!,
                academicSelectionDtoArray
            )
        ]
    }
}