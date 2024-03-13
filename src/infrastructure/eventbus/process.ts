import {ProcessDto} from "../../domain/dtos/process/process.dto";

interface userToCreate {
    firstName: string,
    lastName: string,
    email: string,
    idNumber: string,
}

interface organizationToUse {
    organizationAbbreviation:string,
    modality:string
}

interface stuffToDo {
    user: userToCreate,
    organization: organizationToUse
    courses:[]
}

export class Process {
    public run(processDto:ProcessDto){
        //puede ser que haya usuario en multiple instancias de moodle dentro de un solo evento
        let user:userToCreate[] = []
        for (let i = 0; i < processDto.student.inscriptions.length; i++) {
            let inscription = processDto.student.inscriptions[i]
        }
    }
}