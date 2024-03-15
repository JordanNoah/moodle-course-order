import {DataTypes, Model} from "sequelize";
import {OrganizationSequelize} from "./Organization";
import {sequelize} from "../sequelize";

interface UserRow {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    idNumber: string,
    idOrganization:number,
    createdAt?:Date,
    updatedAt?:Date
}

export class UserSequelize extends Model<UserRow,Omit<UserRow, 'id'>> {
    declare id: number
    declare firstName: string
    declare lastName: string
    declare email: string
    declare idNumber: string
    declare idOrganization:number
    declare readonly createdAt:Date
    declare readonly updatedAt:Date
}

UserSequelize.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
    },
    firstName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    idNumber:{
        type: DataTypes.STRING,
        allowNull: false
    },
    idOrganization:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model:OrganizationSequelize,
            key:'id'
        }
    }
},{
    sequelize,
    timestamps:true,
    tableName:'user'
})

OrganizationSequelize.hasMany(UserSequelize,{foreignKey:'idOrganization',as:'organization'})