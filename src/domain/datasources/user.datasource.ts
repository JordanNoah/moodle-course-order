import {StudentDto} from "../dtos/process/student.dto";
import {UserEntity} from "../entities/user.entity";
import {RegisterStudentDto} from "../dtos/registerStudent.dto";

export abstract class UserDatasource {
    abstract register(studentDto: RegisterStudentDto): Promise<UserEntity>
}