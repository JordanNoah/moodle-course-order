import {StudentDto} from "./student.dto";

export class ProcessDto {
    constructor(
        public uuid: string,
        public firedAt: Date,
        public student: StudentDto
    ) {}


    static create(object:{[key:string]:any}):[string?,ProcessDto?]{
        const {
            uuid,
            fired_at,
            student
        } = object


        const [error,studentDto] = StudentDto.create(student)

        if (error) return [error]

        return [
            undefined,
            new ProcessDto(
                uuid,
                fired_at,
                studentDto!
            )
        ]
    }
}