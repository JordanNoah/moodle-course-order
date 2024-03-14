export class GroupEntity {
    constructor(
        public id: number,
        public idUser: number,
        public type: string,
        public name: string,
        public shortname: string,
        public createdAt:Date,
        public updatedAt:Date,
        public deletedAt:Date
    ) {}
}