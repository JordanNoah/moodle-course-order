import {AcademicElementDto} from "./process/academicElement.dto";

export class RegisterCourseDto{
    constructor(
        public idNumber: string,
        public shortName: string,
        public fullName: string,
        public type: string,
        public version:string
    ) {}
}