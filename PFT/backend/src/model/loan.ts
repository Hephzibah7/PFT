import { DataTypes } from "sequelize";
import db from "../config/db";
import User from "./user";
import Emi from "./emi";
const Loan=db.sequelize.define("Loan",{
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
        },
        onDelete:"CASCADE"
    },
    amount:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    start_date:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    end_date:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    
    createdAt: { 
        type: DataTypes.DATE, 
        allowNull: true, 
        defaultValue: db.sequelize.literal('CURRENT_TIMESTAMP') 
    },
    updatedAt: { 
        type: DataTypes.DATE, 
        allowNull: true, 
        defaultValue: db.sequelize.literal('CURRENT_TIMESTAMP') 
    }


})


export default Loan;