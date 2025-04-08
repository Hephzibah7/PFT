"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const sequelize = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log
});
const dbConnect = () => {
    sequelize
        .authenticate()
        .then(() => console.log("Successfully connected to the database"))
        .catch((error) => console.log('Failed to connect the database', error));
};
const db = {
    sequelize: sequelize,
    dbConnect: dbConnect,
    user: {},
    income: {},
    expense: {},
    emi: {},
    loan: {},
    category: {},
    budget: {}
};
exports.default = db;
