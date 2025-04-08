import { DataTypes } from "sequelize";
import db from "../config/db";


const Category=db.sequelize.define("Category",{
    name:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
        primaryKey:true
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



export default Category;