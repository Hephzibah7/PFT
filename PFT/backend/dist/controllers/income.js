"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const sequelize_1 = require("sequelize");
const verifyToken_1 = __importDefault(require("../helpers/verifyToken"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
const l = process.env.JWT;
// Add Income
async function addIncome(req, res, next) {
    try {
        const { amount, description } = req.body;
        if (!amount || !description) {
            res.status(400).json({ error: "Amount and description are required" });
            return;
        }
        const { userId } = (0, verifyToken_1.default)(req);
        const timestamp = new Date();
        await db_1.default.sequelize.query(`INSERT INTO Incomes (userId, amount, description, createdAt, updatedAt) 
       VALUES (:userId, :amount, :description, :createdAt, :updatedAt)`, {
            replacements: { userId, amount, description, createdAt: timestamp, updatedAt: timestamp },
            type: sequelize_1.QueryTypes.INSERT,
        });
        res.status(201).json({ message: "Income added successfully" });
    }
    catch (error) {
        next(error);
    }
}
// Get All Income
async function getAllIncome(req, res, next) {
    try {
        console.log(l);
        const { userId } = (0, verifyToken_1.default)(req);
        const income = await db_1.default.sequelize.query(`SELECT * FROM Incomes WHERE userId = :userId ORDER BY createdAt DESC LIMIT 5`, {
            replacements: { userId },
            type: sequelize_1.QueryTypes.SELECT,
        });
        res.status(200).json(income);
    }
    catch (error) {
        next(error);
    }
}
// Get Selected Income
async function getSelectedIncome(req, res, next) {
    try {
        const { id } = req.params;
        const { userId } = (0, verifyToken_1.default)(req);
        const income = await db_1.default.sequelize.query(`SELECT * FROM Incomes WHERE userId = :userId AND id = :id`, {
            replacements: { userId, id },
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (!income.length) {
            res.status(404).json({ error: "Income not found" });
            return;
        }
        res.status(200).json(income[0]);
    }
    catch (error) {
        next(error);
    }
}
// Delete Selected Income
async function deleteSelectedIncome(req, res, next) {
    try {
        const { id } = req.params;
        const { userId } = (0, verifyToken_1.default)(req);
        const result = await db_1.default.sequelize.query(`DELETE FROM Incomes WHERE id = :id AND userId = :userId`, {
            replacements: { id, userId },
            type: sequelize_1.QueryTypes.DELETE,
        });
        res.status(200).json({ message: "Income deleted successfully" });
    }
    catch (error) {
        next(error);
    }
}
// Update Selected Income
async function updateSelectedIncome(req, res, next) {
    try {
        const { id } = req.params;
        const { userId } = (0, verifyToken_1.default)(req);
        const body = req.body;
        const updatedAt = new Date();
        if (Object.keys(body).length === 0) {
            res.status(400).json({ error: "No fields provided for update" });
            return;
        }
        const updateFields = Object.keys(body)
            .map((key) => `${key} = :${key}`)
            .join(", ");
        const query = `UPDATE Incomes SET ${updateFields}, updatedAt = :updatedAt WHERE id = :id AND userId = :userId`;
        await db_1.default.sequelize.query(query, {
            replacements: { ...body, updatedAt, id, userId },
            type: sequelize_1.QueryTypes.UPDATE,
        });
        res.status(201).json({ message: "Income updated successfully" });
    }
    catch (error) {
        next(error);
    }
}
const incomeController = {
    addIncome,
    getAllIncome,
    getSelectedIncome,
    deleteSelectedIncome,
    updateSelectedIncome,
};
exports.default = incomeController;
