"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const sequelize_1 = require("sequelize");
const CustomError_1 = __importDefault(require("../middleware/CustomError"));
async function addBudget(budget, next) {
    try {
        const { amount, category, userId } = budget;
        // Validation check
        if (!amount || !category) {
            return next(new CustomError_1.default('Amount and Category are required', 400));
        }
        const createdAt = new Date();
        const updatedAt = new Date();
        // Perform the insert query
        const response = await db_1.default.sequelize.query(`INSERT INTO Budgets (userId, amount, category, createdAt, updatedAt) 
         VALUES (:userId, :amount, :category, :createdAt, :updatedAt)`, {
            replacements: { userId, amount, category, createdAt, updatedAt },
            type: sequelize_1.QueryTypes.INSERT,
        });
        // Check if the insert was successful (optional)
        if (response) {
            return response;
        }
        // If insertion failed, you could throw an error
        return next(new CustomError_1.default('Failed to add the budget', 500));
    }
    catch (error) {
        // Pass error to the next middleware
        next(error);
    }
}
const budgetRepo = {
    addBudget: addBudget
};
exports.default = budgetRepo;
