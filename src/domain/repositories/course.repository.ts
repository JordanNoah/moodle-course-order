import {RegisterCourseDto} from "../dtos/registerCourse.dto";
import {CourseEntity} from "../entities/course.entity";

export abstract class CourseRepository {
    abstract register(registerCourseDto:RegisterCourseDto):Promise<CourseEntity>
}