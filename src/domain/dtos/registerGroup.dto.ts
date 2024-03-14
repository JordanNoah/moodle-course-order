export class RegisterGroupDto {
    constructor(
        public idUser: number,
        public type: string,
        public name: string,
        public shortname: string
    ) {}
}