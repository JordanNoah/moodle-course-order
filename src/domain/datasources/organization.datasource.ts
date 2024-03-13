import {RegisterOrganizationDto} from "../dtos/registerOrganization.dto";
import {OrganizationEntity} from "../entities/organization.entity";

export abstract class OrganizationDatasource {
    abstract register(registerOrganizationDto: RegisterOrganizationDto): Promise<OrganizationEntity>
    abstract getById(id: number): Promise<OrganizationEntity | null>
    abstract getAll(): Promise<OrganizationEntity[]>
    abstract deleteById(id: number): Promise<OrganizationEntity>
    abstract enable(id: number): Promise<OrganizationEntity>
    abstract disable(id: number): Promise<OrganizationEntity>
}