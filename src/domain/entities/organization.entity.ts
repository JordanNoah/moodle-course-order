export class OrganizationEntity {
    constructor(
        public id: number,
        public name: string,
        public abbreviation: string,
        public degree_abbreviation: string,
        public origin: string,
        public rest_path: string,
        public token: string,
        public modality: string,
        public additional_data:any,
        public translations:any,
        public parent:number,
        public importance:number,
        public available:boolean,
        public createdAt:Date,
        public updatedAt:Date
    ) {}
}