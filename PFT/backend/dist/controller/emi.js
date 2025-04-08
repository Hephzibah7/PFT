"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const sequelize_1 = require("sequelize");
async function addemi(req, res) {
    try {
        const { amount, loanId, category, start_date, end_date } = req.body;
        if (!amount || !category || !start_date || !end_date || !loanId) {
            res.status(400).json({ error: "Content cannot be empty" });
        }
        const income = await db_1.default.sequelize.query(`INSERT INTO Incomes(amount, loanId, category, start_date, end_date) VALUES(:userId, :amount, :loanId, :catgory, :start_date, :end_date)`, {
            replacements: { amount: amount, loanId: loanId, category: category, start_date: start_date, end_date: end_date },
            type: sequelize_1.QueryTypes.INSERT
        });
        res.status(200).json({ error: "Successfully added the EMI details" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
async function getAllemi(req, res) {
    try {
        const emi = await db_1.default.sequelize.query(`SELECT * From Emis`);
        res.send(emi);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
async function deleteselectedemi(req, res) {
    try {
        const id = req.params.emiId;
        const income = await db_1.default.sequelize.query(`DELETE FROM Emis WHERE id=:id`, {
            replacements: { id: id },
            type: sequelize_1.QueryTypes.DELETE
        });
        res.status(200).json({ message: "Successfully deleted the emi details" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
async function updateselectedemi(req, res) {
    try {
        const id = req.params.emiId;
        const body = req.body;
        let col = "";
        Object.keys(body).forEach(key => {
            col = col + `${key}` + "=" + ":" + `${key}`;
        });
        const query = "UPDATE `Emis` SET " + col + "where id=:id";
        const emi = await db_1.default.sequelize.query(query, {
            replacements: { uid: id },
            type: sequelize_1.QueryTypes.UPDATE
        });
        res.status(200).json({ message: "Successfully updated the emi details" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
const emiController = {
    addemi: addemi,
    getAllemi: getAllemi,
    deleteselectedemi: deleteselectedemi,
    updateselectedemi: updateselectedemi
};
exports.default = emiController;
