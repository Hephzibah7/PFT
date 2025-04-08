import { DataTypes } from "sequelize";
import db from "../config/db";
import User from "./user";

const Income=db.sequelize.define("Income",{
    id:{
        type:DataTypes.INTEGER,
        unique:true,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:User,
            key:"id"
        }
    },
    amount:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
    }

})


export default Income;