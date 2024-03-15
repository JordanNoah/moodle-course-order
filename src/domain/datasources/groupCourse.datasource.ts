import {GroupCourseEntity} from "../entities/groupCourse.entity";
import {RegisterCourseGroupDto} from "../dtos/registerCourseGroup.dto";

export abstract class GroupCourseDatasource {
    abstract register(registerCourseGroupDto:RegisterCourseGroupDto): Promise<GroupCourseEntity>
    abstract removeByIdGroup(idGroup:number): Promise<boolean>
    abstract getByIdGroup(idGroup:number):Promise<GroupCourseEntity[]>
}