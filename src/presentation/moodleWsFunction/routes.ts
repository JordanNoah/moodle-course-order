import { Router } from "express";
import {MoodleWsFunctionDatasourceImpl} from "../../infrastructure/datasources/moodleWsFunction.datasource.impl";
import {MoodleWsFunctionRepositoryImpl} from "../../infrastructure/repositories/moodleWsFunction.repository.impl";
import {MoodleWsFunctionController} from "./controller";

export class MoodleWsFunctionRoutes {
    static get routes(): Router {
        const router = Router()

        const datasource = new MoodleWsFunctionDatasourceImpl()
        const moodleWsFunctionRepository = new MoodleWsFunctionRepositoryImpl(datasource)

        const controller = new MoodleWsFunctionController(moodleWsFunctionRepository)

        router.post('/', controller.createMoodleWsFunction)
        router.put('/', controller.update)
        router.get('/',controller.getAll)
        router.get('/id/:id', controller.getById)
        router.get('/abbr/:abbr', controller.getByAbbreviation)
        router.delete('/id/:id', controller.deleteById)
        router.delete('/abbr/:abbr', controller.deleteByAbbreviation)

        return router
    }
}