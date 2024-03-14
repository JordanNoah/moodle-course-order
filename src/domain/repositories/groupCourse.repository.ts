import {GroupCourseEntity} from "../entities/groupCourse.entity";
import {RegisterCourseGroupDto} from "../dtos/registerCourseGroup.dto";

export abstract class GroupCourseRepository {
    abstract register(registerCourseGroupDto:RegisterCourseGroupDto): Promise<GroupCourseEntity>
}