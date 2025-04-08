"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const sequelize_1 = require("sequelize");
const verifyToken_1 = __importDefault(require("../helpers/verifyToken"));
async function totalIncome(req, res, next) {
    try {
        const { userId } = (0, verifyToken_1.default)(req);
        const response = await db_1.default.sequelize.query('SELECT SUM(amount) income FROM `Incomes` where userId=:userId', {
            replacements: { userId: userId },
            type: sequelize_1.QueryTypes.SELECT
        });
        res.send(response);
    }
    catch (error) {
        next(error);
    }
}
async function totalExpense(req, res, next) {
    try {
        const { userId } = (0, verifyToken_1.default)(req);
        const response = await db_1.default.sequelize.query('SELECT SUM(amount) expense FROM `Expenses` where userId=:userId', {
            replacements: { userId: userId },
            type: sequelize_1.QueryTypes.SELECT
        });
        res.send(response);
    }
    catch (error) {
        next(error);
    }
}
async function getByMonth(req, res, next) {
    try {
        const year = req.params.year;
        const { userId } = (0, verifyToken_1.default)(req);
        const response = await db_1.default.sequelize.query(`select sum(a.amount) incomes, sum(b.amount) expenses, monthname(a.createdAt) month  from Incomes a JOIN Expenses b where  year(a.createdAt)=:year AND a.userId=:userId group by month`, {
            replacements: { userId: userId, year: year },
            type: sequelize_1.QueryTypes.SELECT
        });
        res.send(response);
    }
    catch (error) {
        next(error);
    }
}
async function getByCategory(req, res, next) {
    try {
        console.log("hello00000");
        const currentMonth = new Date().getMonth() + 1;
        const { userId } = (0, verifyToken_1.default)(req);
        const response = await db_1.default.sequelize.query(`select SUM(amount)/(select SUM(amount) from Incomes)*100 percentage, category FROM Expenses where userId=:userId AND month(createdAt)=:month group by category ORDER BY percentage DESC LIMIT 3;`, {
            replacements: { userId: userId, month: currentMonth },
            type: sequelize_1.QueryTypes.SELECT
        });
        res.send(response);
    }
    catch (error) {
        next(error);
    }
}
async function getDescIncomes(req, res, next) {
    try {
        const { userId } = (0, verifyToken_1.default)(req);
        const month = new Date().getMonth() + 1;
        const response = await db_1.default.sequelize.query(`select description, amount from Incomes where userId=:userId AND month(createdAt)=:month order by amount DESC LIMIT 3;`, {
            replacements: { userId: userId, month: month },
            type: sequelize_1.QueryTypes.SELECT
        });
        res.send(response);
    }
    catch (error) {
        next(error);
    }
}
async function getDescExpenses(req, res, next) {
    try {
        const { userId } = (0, verifyToken_1.default)(req);
        const month = new Date().getMonth() + 1;
        const response = await db_1.default.sequelize.query(`select category, amount from Expenses where userId=:userId AND month(createdAt)=:month order by amount DESC LIMIT 3;`, {
            replacements: { userId: userId, month: month },
            type: sequelize_1.QueryTypes.SELECT
        });
        res.send(response);
    }
    catch (error) {
        next(error);
    }
}
async function getCategoryPercentage(req, res, next) {
    try {
        const { userId } = (0, verifyToken_1.default)(req);
        const month = new Date().getMonth() + 1;
        const response = await db_1.default.sequelize.query(`Select SUM(amount)/(Select SUM(amount) FROM Incomes where userId=:userId and month(createdAt)=:month)*100 percentage FROM Expenses where userId=:userId and month(createdAt)=:month`, {
            replacements: { userId: userId, month: month },
            type: sequelize_1.QueryTypes.SELECT
        });
        res.send(response);
    }
    catch (error) {
        next(error);
    }
}
const queryController = {
    totalIncome: totalIncome,
    totalExpense: totalExpense,
    getByMonth: getByMonth,
    getByCategory: getByCategory,
    getDescIncomes,
    getDescExpenses,
    getCategoryPercentage
};
exports.default = queryController;
