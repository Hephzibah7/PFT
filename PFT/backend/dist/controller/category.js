"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const sequelize_1 = require("sequelize");
const CustomError_1 = __importDefault(require("../middleware/CustomError"));
/**
 * Adds a new category to the database.
 * @param req - Express request object containing category and amount in the body.
 * @param res - Express response object.
 * @param next - Express next function for error handling.
 */
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
        if (!category) {
            next(new CustomError_1.default("Error fetching Data", 500));
        }
        res.status(200).json({ message: "Successfully added" });
    }
    catch (error) {
        next(error);
    }
}
/**
 * Retrieves all categories from the database.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Express next function for error handling.
 */
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
