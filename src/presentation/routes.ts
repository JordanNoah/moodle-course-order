import {Router} from "express";
import {OrganizationRoutes} from "./organization/routes";
import {MoodleWsFunctionRoutes} from "./moodleWsFunction/routes";

export class AppRoutes {
    static get routes(): Router {
        const router = Router()
        router.use('/api/organization', OrganizationRoutes.routes)
        router.use('/api/moodlewsfunction', MoodleWsFunctionRoutes.routes)
        return router
    }
}