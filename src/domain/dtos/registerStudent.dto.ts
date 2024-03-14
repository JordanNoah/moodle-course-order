export class RegisterStudentDto {
    constructor(
        public uuid:string,
        public referenceId:number,
        public idNumber:string,
        public firstName:string,
        public lastName:string,
        public userName:string,
        public password:string,
        public email:string,
        public phone:string,
        public address:string,
        public language:string,
        public organizationId: number
    ) {}
}