export class MoodleWsFunctionEntity {
    constructor(
        public id: number,
        public wsFunction: string,
        public abbreviation: string,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}