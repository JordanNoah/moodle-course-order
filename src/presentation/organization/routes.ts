import { Router } from "express"
import {OrganizationDatasourceImpl} from "../../infrastructure/datasources/organization.datasource.impl";
import {OrganizationRepositoryImpl} from "../../infrastructure/repositories/organization.repository.impl";
import {OrganizationController} from "./controller";

export class OrganizationRoutes {
    static get routes(): Router {
        const router = Router()

        const datasource = new OrganizationDatasourceImpl()
        const organizationRepository = new OrganizationRepositoryImpl(datasource)

        const controller = new OrganizationController(organizationRepository)

        router.post('/', controller.createSignature)
        router.get('/id/:id', controller.getById)
        router.get('/', controller.getAll)
        router.delete('/id/:id', controller.deleteById)
        router.put('/enable', controller.enable)
        router.put('/disable', controller.disable)

        return router
    }
}