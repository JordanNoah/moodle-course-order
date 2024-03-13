export class CourseEntity {
    constructor(
        public id: number,
        public idNumber: string,
        public fullName: string,
        public shortName: string,
        public type: string,
        public version: string,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date
    ) {}
}