"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const user_1 = __importDefault(require("./user"));
const Loan = db_1.default.sequelize.define("Loan", {
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
        },
        onDelete: "CASCADE"
    },
    amount: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    start_date: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    end_date: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        defaultValue: db_1.default.sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        defaultValue: db_1.default.sequelize.literal('CURRENT_TIMESTAMP')
    }
});
exports.default = Loan;
