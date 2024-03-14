import {DataTypes, Model} from "sequelize";
import {sequelize} from "../sequelize";

interface CourseRow {
    id: number,
    idNumber: string,
    fullName: string,
    shortName: string,
    type: string,
    version: string,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date
}

export class CourseSequelize extends Model<CourseRow, Omit<CourseRow, 'id'>> {
    declare id: number
    declare idNumber: string
    declare fullName: string
    declare shortName: string
    declare type: string
    declare version: string
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
    declare readonly deletedAt: Date
}

CourseSequelize.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
    },
    idNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shortName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    version: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    timestamps:true,
    paranoid:true,
    tableName:'course'
})