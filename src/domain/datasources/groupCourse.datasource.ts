import {GroupCourseEntity} from "../entities/groupCourse.entity";
import {RegisterCourseGroupDto} from "../dtos/registerCourseGroup.dto";

export abstract class GroupCourseDatasource {
    abstract register(registerCourseGroupDto:RegisterCourseGroupDto): Promise<GroupCourseEntity>
}