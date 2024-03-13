import {MoodleWsFunctionRepository} from "../../domain/repositories/moodleWsFunction.repository";
import {MoodleWsFunctionDatasource} from "../../domain/datasources/moodleWsFunction.datasource";
import {RegisterMoodleWsFunctionDto} from "../../domain/dtos/registerMoodleWsFunction.dto";
import {MoodleWsFunctionEntity} from "../../domain/entities/moodleWsFunction.entity";
import {UpdateMoodleWsFunctionDto} from "../../domain/dtos/updateMoodleWsFunction.dto";

export class MoodleWsFunctionRepositoryImpl implements MoodleWsFunctionRepository {
    constructor(
        private readonly moodleWsFunctionDatasource:MoodleWsFunctionDatasource
    ) {}

    register(registerMoodleWsFunctionDto: RegisterMoodleWsFunctionDto): Promise<MoodleWsFunctionEntity> {
        return this.moodleWsFunctionDatasource.register(registerMoodleWsFunctionDto)
    }

    deleteById(id: number): Promise<MoodleWsFunctionEntity> {
        return this.moodleWsFunctionDatasource.deleteById(id)
    }

    getById(id: number): Promise<MoodleWsFunctionEntity | null> {
        return this.moodleWsFunctionDatasource.getById(id)
    }

    getByAbbreviation(abbreviation: string): Promise<MoodleWsFunctionEntity | null> {
        return this.moodleWsFunctionDatasource.getByAbbreviation(abbreviation)
    }

    deleteByAbbreviation(abbreviation: string): Promise<MoodleWsFunctionEntity> {
        return this.moodleWsFunctionDatasource.deleteByAbbreviation(abbreviation)
    }

    getAll(): Promise<MoodleWsFunctionEntity[]> {
        return this.moodleWsFunctionDatasource.getAll()
    }

    update(updateMoodleWsFunctionDto: UpdateMoodleWsFunctionDto): Promise<MoodleWsFunctionEntity> {
        return this.moodleWsFunctionDatasource.update(updateMoodleWsFunctionDto)
    }
}