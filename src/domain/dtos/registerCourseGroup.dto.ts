export class RegisterCourseGroupDto {
    constructor(
        public idGroup: number,
        public idCourse: number,
        public order: number
    ) {}
}