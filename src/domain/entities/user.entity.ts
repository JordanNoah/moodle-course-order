export class UserEntity {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public email: string,
        public idNumber: string,
        public idOrganization:number,
        public createdAt:Date,
        public updatedAt:Date
    ) {}
}