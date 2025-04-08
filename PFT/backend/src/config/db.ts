import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();



const dbName=process.env.DB_NAME as string;
const dbUser=process.env.DB_USER as string;
const dbPassword=process.env.DB_PASSWORD as string;

const sequelize=new Sequelize(dbName, dbUser, dbPassword,{
    host:'localhost',
    dialect:'mysql',
    logging:console.log
});

const dbConnect=()=>{
    sequelize
    .authenticate()
    .then(()=>console.log("Successfully connected to the database"))
    .catch((error)=>console.log('Failed to connect the database', error))
}

const db={
    sequelize:sequelize,
    dbConnect:dbConnect,
    user:{},
    income:{},
    expense:{},
    emi:{},
    loan:{},
    category:{},
    budget:{}

}

export default db;