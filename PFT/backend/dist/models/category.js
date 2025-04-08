"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const Category = db_1.default.sequelize.define("Category", {
    name: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true
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
exports.default = Category;
