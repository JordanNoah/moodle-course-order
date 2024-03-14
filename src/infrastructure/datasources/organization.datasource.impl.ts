import {OrganizationDatasource} from "../../domain/datasources/organization.datasource";
import {RegisterOrganizationDto} from "../../domain/dtos/registerOrganization.dto";
import {OrganizationEntity} from "../../domain/entities/organization.entity";
import {CustomError} from "../../domain/errors/custom.error";
import {OrganizationSequelize} from "../database/models/Organization";

export class OrganizationDatasourceImpl implements OrganizationDatasource {
    async register(registerOrganizationDto: RegisterOrganizationDto): Promise<OrganizationEntity> {
        try {
            const {
                abbreviation,
                translations,
                token,
                website,
                rest_path,
                name,
                modality,
                uuid,
                domain,
                fullname,
                additional_data
            } = registerOrganizationDto

            const [organizationDb,created] = await OrganizationSequelize.findOrCreate({
                where:{
                    abbreviation:abbreviation,
                    modality:modality
                },
                defaults:{
                    name:name,
                    abbreviation:abbreviation,
                    degree_abbreviation:abbreviation,
                    origin:website,
                    rest_path:rest_path,
                    token:token,
                    modality:modality,
                    additional_data:additional_data,
                    translations:translations,
                    available:true
                }
            })

            return organizationDb
        } catch (error) {
            if(error instanceof CustomError){
                throw error
            }
            throw CustomError.internalSever()
        }
    }

    async getById(id: number): Promise<OrganizationEntity | null> {
        try {
            return await OrganizationSequelize.findOne({
                where:{
                    id:id
                }
            })
        } catch (error) {
            if(error instanceof CustomError){
                throw error
            }
            throw CustomError.internalSever()
        }
    }

    async getAll(): Promise<OrganizationEntity[]> {
        try {
            return await OrganizationSequelize.findAll()
        } catch (error) {
            if(error instanceof CustomError){
                throw error
            }
            throw CustomError.internalSever()
        }
    }

    async getByAbbreviationAndModality(abbreviation: string, modality: string): Promise<OrganizationEntity | null> {
        try {
            return await OrganizationSequelize.findOne({
                where:{
                    abbreviation:abbreviation.toUpperCase(),
                    modality:modality.toLowerCase()
                }
            })
        } catch (error) {
            if(error instanceof CustomError){
                throw error
            }
            throw CustomError.internalSever()
        }
    }

    async deleteById(id: number): Promise<OrganizationEntity> {
        try {
            const organization = await this.getById(id)

            if (!organization) {
                throw CustomError.notFound('Organization not found')
            }

            await OrganizationSequelize.destroy({
                where:{
                    id:id
                }
            })
            return organization
        } catch (error) {
            if(error instanceof CustomError){
                throw error
            }
            throw CustomError.internalSever()
        }
    }

    async disable(id: number): Promise<OrganizationEntity> {
        try {
            const organization = await this.getById(id)

            if (!organization) {
                throw CustomError.notFound('Organization not found')
            }

            await OrganizationSequelize.update({
                available: false
            },{
                where:{
                    id:id
                }
            })

            organization.available = false

            return organization
        } catch (error) {
            if(error instanceof CustomError){
                throw error
            }
            throw CustomError.internalSever()
        }
    }

    async enable(id: number): Promise<OrganizationEntity> {
        try {
            const organization = await this.getById(id)

            if (!organization) {
                throw CustomError.notFound('Organization not found')
            }

            await OrganizationSequelize.update({
                available: true
            },{
                where:{
                    id:id
                }
            })

            organization.available = true

            return organization
        } catch (error) {
            if(error instanceof CustomError){
                throw error
            }
            throw CustomError.internalSever()
        }
    }
}