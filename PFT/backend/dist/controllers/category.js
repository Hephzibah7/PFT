"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const sequelize_1 = require("sequelize");
async function addCategory(req, res, next) {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(400).json({ error: "category is missing" });
        }
        const category = await db_1.default.sequelize.query(`INSERT INTO Categories(name) VALUES(:name)`, {
            replacements: { name: name },
            type: sequelize_1.QueryTypes.INSERT,
        });
        res.status(200).json({ message: "Successfully added" });
    }
    catch (error) {
        next(error);
    }
}
async function getAllCategory(req, res, next) {
    try {
        const categories = await db_1.default.sequelize.query(`SELECT * From Categories`, {
            type: sequelize_1.QueryTypes.SELECT,
        });
        res.send(categories);
    }
    catch (error) {
        next(error);
    }
}
const categoryController = {
    addCategory: addCategory,
    getAllCategory: getAllCategory,
};
exports.default = categoryController;
