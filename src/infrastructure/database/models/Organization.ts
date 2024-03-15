import { Model, DataTypes } from 'sequelize'
import { sequelize } from "../sequelize";

interface OrganizationRow {
    id: number,
    name: string,
    abbreviation: string,
    degree_abbreviation: string,
    origin: string,
    rest_path: string,
    token: string,
    modality: string,
    additional_data:any,
    translations:any,
    parent:number | null,
    importance:number | null,
    available:boolean,
    createdAt?:Date,
    updatedAt?:Date
}

export class OrganizationSequelize extends Model<OrganizationRow, Omit<OrganizationRow, 'id'>> {
    declare id: number
    declare name: string
    declare abbreviation: string
    declare degree_abbreviation: string
    declare origin: string
    declare rest_path: string
    declare token: string
    declare modality: string
    declare additional_data:any
    declare translations:any
    declare parent:number
    declare importance:number
    declare available:boolean
    declare readonly createdAt:Date
    declare readonly updatedAt:Date
}

OrganizationSequelize.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    abbreviation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    degree_abbreviation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    origin: {
        type: DataTypes.STRING,
        allowNull: true
    },
    rest_path: {
        type: DataTypes.STRING,
        allowNull: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    modality: {
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            isIn:[['virtual','presential']]
        }
    },
    additional_data: {
        type: DataTypes.JSON,
        allowNull: true
    },
    translations: {
        type: DataTypes.JSON,
        allowNull: true
    },
    parent: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    importance: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    available: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
},{
    sequelize,
    timestamps: true,
    tableName: 'organization'
})