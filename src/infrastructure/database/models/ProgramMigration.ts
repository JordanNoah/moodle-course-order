import {DataTypes, Model} from "sequelize";
import { sequelize } from "../sequelize";

interface ProgramMigrationRow {
    id: number,
    programAbbreviation: string,
    version: string,
    createdAt?: Date,
    updatedAt?: Date
}

export class ProgramMigrationSequelize extends Model<ProgramMigrationRow,Omit<ProgramMigrationRow, 'id'>> {
    declare id: number
    declare programAbbreviation: string
    declare version: string
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
}

ProgramMigrationSequelize.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    programAbbreviation:{
        type: DataTypes.STRING,
        allowNull:false
    },
    version:{
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    sequelize,
    timestamps:true,
    tableName:'program_migration'
})