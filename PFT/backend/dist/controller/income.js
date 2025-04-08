"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifyToken_1 = __importDefault(require("../helper/verifyToken"));
const dotenv_1 = __importDefault(require("dotenv"));
const income_1 = __importDefault(require("../repositary/income"));
// Load environment variables
dotenv_1.default.config();
/**
 * Adds a new income record for the authenticated user.
 *
 * @param req - Express request object containing amount and description in the body.
 * @param res - Express response object to send the success message.
 * @param next - Express next function to handle errors.
 */
async function addIncome(req, res, next) {
    try {
        const { amount, description } = req.body;
        const { userId } = (0, verifyToken_1.default)(req);
        await income_1.default.addIncome(amount, description, userId, next);
        res.status(201).json({ message: "Income added successfully" });
    }
    catch (error) {
        next(error);
    }
}
/**
 * Retrieves a specific income record by its ID.
 *
 * @param req - Express request object containing the income ID in params.
 * @param res - Express response object containing the selected income details.
 * @param next - Express next function to handle errors.
 */
async function getAllIncome(req, res, next) {
    try {
        const { userId } = (0, verifyToken_1.default)(req);
        const { page, limit } = req.query;
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const income = await income_1.default.getAllIncome(userId, pageNumber, limitNumber, next);
        console.log(income);
        const length = await income_1.default.getAllIncomesLength(userId, next);
        const totalPage = Math.ceil(Number(length) / limitNumber);
        const data = {
            totalPage: totalPage,
            income: income
        };
        res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
}
/**
 * Retrieves a specific income record by its ID.
 *
 * @param req - Express request object containing the income ID in params.
 * @param res - Express response object containing the selected income details.
 * @param next - Express next function to handle errors.
 */
async function getSelectedIncome(req, res, next) {
    try {
        const { id } = req.params;
        const { userId } = (0, verifyToken_1.default)(req);
        const income = await income_1.default.getSelectedIncome(id, userId, next);
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
/**
 * Deletes a specific income record by its ID.
 *
 * @param req - Express request object containing the income ID in params.
 * @param res - Express response object containing a success message.
 * @param next - Express next function to handle errors.
 */
async function deleteSelectedIncome(req, res, next) {
    try {
        const { id } = req.params;
        const { userId } = (0, verifyToken_1.default)(req);
        await income_1.default.deleteSelectedIncome(id, userId, next);
        res.status(200).json({ message: "Income deleted successfully" });
    }
    catch (error) {
        next(error);
    }
}
/**
 * Updates a specific income record by its ID.
 *
 * @param req - Express request object containing the income ID in params and update data in the body.
 * @param res - Express response object containing a success message.
 * @param next - Express next function to handle errors.
 */
async function updateSelectedIncome(req, res, next) {
    try {
        const { id } = req.params;
        const { userId } = (0, verifyToken_1.default)(req);
        const body = req.body;
        await income_1.default.updateSelectedIncome(id, userId, body, next);
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
