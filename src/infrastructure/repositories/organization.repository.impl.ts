import {OrganizationRepository} from "../../domain/repositories/organization.repository";
import {OrganizationDatasource} from "../../domain/datasources/organization.datasource";
import {RegisterOrganizationDto} from "../../domain/dtos/registerOrganization.dto";
import {OrganizationEntity} from "../../domain/entities/organization.entity";

export class OrganizationRepositoryImpl implements OrganizationRepository {
    constructor(
        private readonly organizationDatasource:OrganizationDatasource
    ) {}

    register(registerOrganizationDto: RegisterOrganizationDto): Promise<OrganizationEntity> {
        return this.organizationDatasource.register(registerOrganizationDto)
    }

    getById(id: number): Promise<OrganizationEntity | null> {
        return this.organizationDatasource.getById(id)
    }

    getAll(): Promise<OrganizationEntity[]> {
        return this.organizationDatasource.getAll()
    }

    deleteById(id: number): Promise<OrganizationEntity> {
        return this.organizationDatasource.deleteById(id)
    }

    disable(id: number): Promise<OrganizationEntity> {
        return this.organizationDatasource.disable(id)
    }

    enable(id: number): Promise<OrganizationEntity> {
        return this.organizationDatasource.enable(id)
    }
}