"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const sequelize_1 = require("sequelize");
const verifyToken_1 = __importDefault(require("../helpers/verifyToken"));
// Add Expense
async function addExpense(req, res, next) {
    try {
        const { amount, category, description } = req.body;
        if (!amount || !category) {
            return next(new Error('Amount and Category are required'));
        }
        const { userId } = (0, verifyToken_1.default)(req);
        const createdAt = new Date();
        const updatedAt = new Date();
        await db_1.default.sequelize.query(`INSERT INTO Expenses (userId, amount, category, description, createdAt, updatedAt) 
       VALUES (:userId, :amount, :category, :description, :createdAt, :updatedAt)`, {
            replacements: { userId, amount, category, description, createdAt, updatedAt },
            type: sequelize_1.QueryTypes.INSERT,
        });
        res.status(200).json({ message: "Successfully added the expense details" });
    }
    catch (error) {
        next(error);
    }
}
// Get Selected Expense
async function getSelectedExpense(req, res, next) {
    try {
        const { id } = req.params;
        const { userId } = (0, verifyToken_1.default)(req);
        const expense = await db_1.default.sequelize.query(`SELECT * FROM Expenses WHERE userId = :userId AND id = :id`, {
            replacements: { userId, id },
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (expense.length === 0) {
            res.status(404).json({ error: "Expense not found" });
            return;
        }
        res.json(expense[0]);
    }
    catch (error) {
        next(error);
    }
}
//  Get All Expenses (Latest 5)
async function getAllExpense(req, res, next) {
    try {
        const { userId } = (0, verifyToken_1.default)(req);
        const expenses = await db_1.default.sequelize.query(`SELECT * FROM Expenses WHERE userId = :userId ORDER BY createdAt DESC LIMIT 5`, {
            replacements: { userId },
            type: sequelize_1.QueryTypes.SELECT,
        });
        res.json(expenses);
    }
    catch (error) {
        next(error);
    }
}
//  Delete Expense
async function deleteSelectedExpense(req, res, next) {
    try {
        const { id } = req.params;
        const result = await db_1.default.sequelize.query(`DELETE FROM Expenses WHERE id = :id`, {
            replacements: { id },
            type: sequelize_1.QueryTypes.DELETE,
        });
        res.json({ message: "Successfully deleted the expense details" });
    }
    catch (error) {
        next(error);
    }
}
//  Update Expense
async function updateSelectedExpense(req, res, next) {
    try {
        const { id } = req.params;
        const body = req.body;
        const updatedAt = new Date();
        const { userId } = (0, verifyToken_1.default)(req);
        if (Object.keys(body).length === 0) {
            res.status(400).json({ error: "At least one field is required to update" });
            return;
        }
        let setClauses = Object.keys(body)
            .map((key) => `${key} = :${key}`)
            .join(", ");
        const query = `UPDATE Expenses SET ${setClauses}, updatedAt = :updatedAt WHERE id = :id AND userId = :userId`;
        const result = await db_1.default.sequelize.query(query, {
            replacements: { ...body, updatedAt, id, userId },
            type: sequelize_1.QueryTypes.UPDATE,
        });
        if (!result) {
            res.status(404).json({ error: "Expense not found or no changes made" });
            return;
        }
        res.json({ message: "Successfully updated the expense details" });
    }
    catch (error) {
        next(error);
    }
}
//  Export Controller
const expenseController = {
    addExpense,
    getAllExpense,
    deleteSelectedExpense,
    updateSelectedExpense,
    getSelectedExpense,
};
exports.default = expenseController;
