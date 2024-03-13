import {AcademicElementDto} from "./academicElement.dto";

export class IntroductoryModuleDto {
    private constructor(
        public uuid:string,
        public referenceId:string,
        public type:string,
        public name:string,
        public abbreviation:string,
        public version:string,
        public academicElement:AcademicElementDto[]
    ) {}

    static create(object:{[key:string]:any}):[string?,IntroductoryModuleDto?]{
        const {
            uuid,
            reference_id,
            type,
            name,
            abbreviation,
            version,
            academic_element
        } = object

        let academicElementDtoArray: AcademicElementDto[] = []
        for (let i = 0; i < academic_element.length; i++) {
            const [error, academicElementDto] = AcademicElementDto.create(academic_element[i])
            if(error) return [error]
            academicElementDtoArray.push(academicElementDto!)
        }


        return [
            undefined,
            new IntroductoryModuleDto(
                uuid,
                reference_id,
                type,
                name,
                abbreviation,
                version,
                academicElementDtoArray
            )
        ]
    }
}