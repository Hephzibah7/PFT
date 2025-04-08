import { DataTypes } from "sequelize";
import db from "../config/db";
import Income from "./income";

const User=db.sequelize.define("User",{
    id:{
        type:DataTypes.INTEGER,
        unique:true,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    firstname:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    lastname:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    }

})

// User.hasMany(Income,{onDelete:"cascade"});

export default User;