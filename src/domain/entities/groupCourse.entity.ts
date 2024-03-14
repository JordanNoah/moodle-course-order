export class GroupCourseEntity {
    constructor(
        public id: number,
        public idGroup: number,
        public idCourse: number,
        public order: number,
        public createdAt:Date,
        public updatedAt:Date,
        public deletedAt:Date
    ) {}
}