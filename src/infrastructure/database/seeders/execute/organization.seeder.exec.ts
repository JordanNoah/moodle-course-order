import OrganizationSeederData from "../data/organization.seeder.data";
import {OrganizationSequelize} from "../../models/Organization";
import {RegisterOrganizationDto} from "../../../../domain/dtos/registerOrganization.dto";
import {OrganizationDatasourceImpl} from "../../../datasources/organization.datasource.impl";

export class OrganizationSeederExec {
    public async up(){
        const organizationSeeder = OrganizationSeederData;
        for (let i = 0; i < organizationSeeder.length; i++){
            const [error,organizationDto] = RegisterOrganizationDto.create(organizationSeeder[i])
            if (error) throw Error(error)
            const organization = organizationDto!
            await new OrganizationDatasourceImpl().register(organization)
        }
    }

    public async down(){
        await OrganizationSequelize.sync({force:true})
    }
}