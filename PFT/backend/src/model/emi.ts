import { DataTypes } from "sequelize";
import db from "../config/db";
import User from "./user";
import { timeStamp } from "console";
import Loan from "./loan";

const Emi=db.sequelize.define("Emi",{
    id:{
        type:DataTypes.INTEGER,
        unique:true,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    amount:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    loanId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Loan,
            key:"id"
        },
        onDelete:"CASCADE"
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



export default Emi;