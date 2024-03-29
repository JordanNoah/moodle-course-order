import {GroupEntity} from "../entities/group.entity";
import {RegisterGroupDto} from "../dtos/registerGroup.dto";

export abstract class GroupDatasource {
    abstract register(registerGroupDto: RegisterGroupDto):Promise<GroupEntity>
    abstract getByIdUserAndType(id:number,typeGroup:string):Promise<GroupEntity|null>
    abstract removeByIdUserAndShortname(idUser:number,shortname:string):Promise<number>
}