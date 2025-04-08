"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const sequelize_1 = require("sequelize");
const CustomError_1 = __importDefault(require("../middleware/CustomError"));
async function addIncome(amount, description, userId, next) {
    try {
        if (!amount || !description) {
            return next(new Error('Amount and Description are required'));
        }
        const timestamp = new Date();
        await db_1.default.sequelize.query(`INSERT INTO Incomes (userId, amount, description, createdAt, updatedAt) 
         VALUES (:userId, :amount, :description, :createdAt, :updatedAt)`, {
            replacements: { userId, amount, description, createdAt: timestamp, updatedAt: timestamp },
            type: sequelize_1.QueryTypes.INSERT,
        });
    }
    catch (error) {
        next(error);
    }
}
// Get All Income
async function getAllIncome(userId, pageNumber, limitNumber, next) {
    try {
        const skip = (pageNumber - 1) * limitNumber;
        const income = await db_1.default.sequelize.query(`SELECT * FROM Incomes WHERE userId = :userId ORDER BY createdAt DESC LIMIT :limitNumber offset :skip`, {
            replacements: { userId, limitNumber, skip },
            type: sequelize_1.QueryTypes.SELECT,
        });
        return income;
    }
    catch (error) {
        next(error);
        return [];
    }
}
// Get Selected Income
async function getSelectedIncome(id, userId, next) {
    try {
        const income = await db_1.default.sequelize.query(`SELECT * FROM Incomes WHERE userId = :userId AND id = :id`, {
            replacements: { userId, id },
            type: sequelize_1.QueryTypes.SELECT,
        });
        return income;
    }
    catch (error) {
        next(error);
        return [];
    }
}
// Delete Selected Income
async function deleteSelectedIncome(id, userId, next) {
    try {
        const result = await db_1.default.sequelize.query(`DELETE FROM Incomes WHERE id = :id AND userId = :userId`, {
            replacements: { id, userId },
            type: sequelize_1.QueryTypes.DELETE,
        });
    }
    catch (error) {
        next(error);
    }
}
// Update Selected Income
async function updateSelectedIncome(id, userId, body, next) {
    try {
        const updatedAt = new Date();
        if (Object.keys(body).length === 0) {
            return next(new CustomError_1.default('No fields provided for update', 400));
        }
        const updateFields = Object.keys(body)
            .map((key) => `${key} = :${key}`)
            .join(", ");
        const query = `UPDATE Incomes SET ${updateFields}, updatedAt = :updatedAt WHERE id = :id AND userId = :userId`;
        await db_1.default.sequelize.query(query, {
            replacements: { ...body, updatedAt, id, userId },
            type: sequelize_1.QueryTypes.UPDATE,
        });
    }
    catch (error) {
        next(error);
    }
}
async function getAllIncomesLength(userId, next) {
    try {
        const incomes = await db_1.default.sequelize.query(`SELECT * from Incomes where userId=:userId`, {
            replacements: { userId },
            type: sequelize_1.QueryTypes.SELECT
        });
        const length = incomes.length;
        return length;
    }
    catch (error) {
        next(error);
        return [];
    }
}
const incomeRepo = {
    addIncome: addIncome,
    getAllIncome: getAllIncome,
    getSelectedIncome: getSelectedIncome,
    deleteSelectedIncome: deleteSelectedIncome,
    updateSelectedIncome: updateSelectedIncome,
    getAllIncomesLength: getAllIncomesLength
};
exports.default = incomeRepo;
