import {DataTypes, Model} from "sequelize";
import {sequelize} from "../sequelize";
import {UserSequelize} from "./User";

interface GroupRow {
    id: number,
    idUser: number,
    type: string,
    name: string,
    shortname: string,
    createdAt?:Date,
    updatedAt?:Date
}

export class GroupSequelize extends Model<GroupRow,Omit<GroupRow, 'id'>> {
    declare id: number
    declare idUser: number
    declare type: string
    declare name: string
    declare shortname: string
    declare readonly createdAt:Date
    declare readonly updatedAt:Date
}

GroupSequelize.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
    },
    idUser:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: UserSequelize,
            key: 'id'
        }
    },
    type:{
        type: DataTypes.STRING,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    shortname:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    timestamps:true,
    tableName:'group'
})

UserSequelize.hasMany(GroupSequelize,{foreignKey:'idUser',as:'user'})