import {DataTypes, Model} from "sequelize";
import {sequelize} from "../sequelize";
import {GroupSequelize} from "./Group";
import {CourseSequelize} from "./Course";

interface GroupCourseRow {
    id: number,
    idGroup: number,
    idCourse: number,
    order: number,
    createdAt?:Date,
    updatedAt?:Date,
    deletedAt?:Date
}

export class GroupCourseSequelize extends Model<GroupCourseRow,Omit<GroupCourseRow, 'id'>> {
    declare id: number
    declare idGroup: number
    declare idCourse: number
    declare order: number
    declare readonly createdAt:Date
    declare readonly updatedAt:Date
    declare readonly deletedAt:Date
}

GroupCourseSequelize.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
    },
    idGroup:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:GroupSequelize,
            key:'id'
        }
    },
    idCourse:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:CourseSequelize,
            key:'id'
        }
    },
    order:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
},{
    sequelize,
    timestamps:true,
    paranoid:true,
    tableName:'group_course'
})

GroupSequelize.hasMany(GroupCourseSequelize,{foreignKey:'idGroup',as:'group'})
CourseSequelize.hasMany(GroupCourseSequelize,{foreignKey:'idCourse',as:'course'})