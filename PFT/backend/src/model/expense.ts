import { DataTypes } from "sequelize";
import db from "../config/db";
import User from "./user";
import Category from "./category";

const Expense=db.sequelize.define("Expense",{
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
    category:{
        type:DataTypes.STRING,
        allowNull:false,
        references:{
            model:Category,
            key:"name"
        }
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
    },

})


export default Expense;