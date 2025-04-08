"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const user_1 = __importDefault(require("./user"));
const category_1 = __importDefault(require("./category"));
const Expense = db_1.default.sequelize.define("Expense", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user_1.default,
            key: "id"
        }
    },
    amount: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: category_1.default,
            key: "name"
        }
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
});
exports.default = Expense;
