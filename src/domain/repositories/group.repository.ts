import {GroupEntity} from "../entities/group.entity";
import {RegisterGroupDto} from "../dtos/registerGroup.dto";

export abstract class GroupRepository {
    abstract register(registerGroupDto: RegisterGroupDto): Promise<GroupEntity>
}