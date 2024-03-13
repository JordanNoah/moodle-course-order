import {CourseEntity} from "../entities/course.entity";
import {RegisterCourseDto} from "../dtos/registerCourse.dto";

export abstract class CourseDatasource {
    abstract register(registerCourseDto:RegisterCourseDto):Promise<CourseEntity>
}