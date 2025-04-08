"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifyToken_1 = __importDefault(require("../helper/verifyToken"));
const budget_1 = __importDefault(require("../repositary/budget"));
async function addBudget(req, res, next) {
    try {
        const { amount, category } = req.body;
        const { userId } = (0, verifyToken_1.default)(req);
        const budget = {
            amount: amount,
            category: category,
            userId: userId
        };
        const response = await budget_1.default.addBudget(budget, next);
        console.log("bye");
        if (response) {
            res.status(200).json({ message: "Successfully added Budget Details" });
        }
    }
    catch (error) {
        next(error);
    }
}
const budgetController = {
    addBudget: addBudget
};
exports.default = budgetController;
