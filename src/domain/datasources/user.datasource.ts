import {StudentDto} from "../dtos/process/student.dto";
import {UserEntity} from "../entities/user.entity";

export abstract class UserDatasource {
    abstract register(studentDto: StudentDto): Promise<UserEntity>
}