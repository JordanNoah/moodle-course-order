import {AcademicElementDto} from "./academicElement.dto";

export class AcademicSelectionDto {
    private constructor(
        public uuid: string,
        public referenceId: number,
        public admissionId: number,
        public startedAt: number,
        public academicElements:AcademicElementDto[]
    ) {}

    static create(object: {[key:string]:any}):[string?,AcademicSelectionDto?] {
        const {
            uuid,
            reference_id,
            admission_id,
            started_at,
            academic_element
        } = object

        let academicElementDtoArray: AcademicElementDto[] = []
        for (let i = 0; i < academic_element.length; i++) {
            const [error,academicElementDto] = AcademicElementDto.create(academic_element[i])
            if (error) return [error]
            academicElementDtoArray.push(academicElementDto!)
        }

        return [
            undefined,
            new AcademicSelectionDto(
                uuid,
                reference_id,
                admission_id,
                started_at,
                academicElementDtoArray
            )
        ]
    }
}