"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../config/db"));
const sequelize_1 = require("sequelize");
async function addloan(req, res) {
    try {
        const { amount, category, start_date, end_date } = req.body;
        if (!amount || !category || !start_date || !end_date) {
            res.status(400).json({ error: "amount and category is missing" });
        }
        const rtoken = req.header("Authorization");
        const token = rtoken.replace("Bearer ", "");
        const decoded = jsonwebtoken_1.default.verify(token, "your_secret_key");
        const userId = decoded.userId;
        const expense = await db_1.default.sequelize.query(`INSERT INTO Expenses(userId, amount, category, start_date, end_date) VALUES(:userId, :amount, :category, :start_date, :end_date)`, {
            replacements: { userId: userId, amount: amount, category: category, start_date: start_date, end_date: end_date },
            type: sequelize_1.QueryTypes.INSERT
        });
        res.status(200).json({ error: "Successfully added the loan details" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
async function deleteselectedloan(req, res) {
    try {
        const id = req.params.loanId;
        const loan = await db_1.default.sequelize.query(`DELETE FROM Loan WHERE id=:id`, {
            replacements: { id: id },
            type: sequelize_1.QueryTypes.DELETE
        });
        res.status(200).json({ message: "Successfully deleted the loan details" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
async function getAllloan(req, res) {
    try {
        const rtoken = req.header("Authorization");
        const token = rtoken.replace("Bearer ", "");
        const decoded = jsonwebtoken_1.default.verify(token, "your_secret_key");
        const userId = decoded.userId;
        const loan = await db_1.default.sequelize.query(`SELECT * From Loans where userId=:userId`, {
            replacements: { userId: userId },
            type: sequelize_1.QueryTypes.SELECT
        });
        res.send(loan);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
const loanController = {
    addloan: addloan,
    deleteselectedloan: deleteselectedloan,
    getAllloan: getAllloan
};
exports.default = loanController;
