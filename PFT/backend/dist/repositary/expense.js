"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
async function addExpense(expense, next) {
    try {
        const { amount, category, description, userId } = expense;
        if (!amount || !category || !description) {
            return next(new Error('Amount and Category are required'));
        }
        const createdAt = new Date();
        const updatedAt = new Date();
        await db_1.default.sequelize.query(`INSERT INTO Expenses (userId, amount, category, description, createdAt, updatedAt) 
         VALUES (:userId, :amount, :category, :description, :createdAt, :updatedAt)`, {
            replacements: { userId, amount, category, description, createdAt, updatedAt },
            type: sequelize_1.QueryTypes.INSERT,
        });
    }
    catch (error) {
        next(error);
    }
}
async function getSelectedExpense(id, userId, next) {
    try {
        const expense = await db_1.default.sequelize.query(`SELECT * FROM Expenses WHERE userId = :userId AND id = :id`, {
            replacements: { userId, id },
            type: sequelize_1.QueryTypes.SELECT,
        });
        return expense;
    }
    catch (error) {
        next(error);
        return [];
    }
}
//  Get All Expenses (Latest 5)
async function getAllExpense(userId, pageNumber, limitNumber, next) {
    try {
        const skip = (pageNumber - 1) * limitNumber;
        const expenses = await db_1.default.sequelize.query(`SELECT * FROM Expenses WHERE userId = :userId ORDER BY createdAt DESC LIMIT :limitNumber offset :skip`, {
            replacements: { userId, limitNumber, skip },
            type: sequelize_1.QueryTypes.SELECT,
        });
        return expenses;
    }
    catch (error) {
        next(error);
        return [];
    }
}
async function getAllExpensesLength(userId, next) {
    try {
        const expenses = await db_1.default.sequelize.query(`SELECT * from Expenses where userId=:userId`, {
            replacements: { userId },
            type: sequelize_1.QueryTypes.SELECT
        });
        const length = expenses.length;
        return length;
    }
    catch (error) {
        next(error);
        return [];
    }
}
//  Delete Expense
async function deleteSelectedExpense(id, next) {
    try {
        const result = await db_1.default.sequelize.query(`DELETE FROM Expenses WHERE id = :id`, {
            replacements: { id },
            type: sequelize_1.QueryTypes.DELETE,
        });
        return result;
    }
    catch (error) {
        next(error);
    }
}
async function updateSelectedExpense(id, body, next) {
    try {
        const updatedAt = new Date();
        let setClauses = Object.keys(body)
            .map((key) => `${key} = :${key}`)
            .join(", ");
        const query = `UPDATE Expenses SET ${setClauses}, updatedAt = :updatedAt WHERE id = :id AND userId = :userId`;
        const result = await db_1.default.sequelize.query(query, {
            replacements: { ...body, updatedAt, id },
            type: sequelize_1.QueryTypes.UPDATE,
        });
    }
    catch (error) {
        next(error);
    }
}
const expenseRepo = {
    addExpense: addExpense,
    getSelectedExpense: getSelectedExpense,
    getAllExpense: getAllExpense,
    deleteSelectedExpense: deleteSelectedExpense,
    updateSelectedExpense: updateSelectedExpense,
    getAllExpensesLength: getAllExpensesLength
};
exports.default = expenseRepo;
