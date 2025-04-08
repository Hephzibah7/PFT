"use strict";
// import express from "express";
// import authenticateToken from "../middleware/auth";
// import expenseController from "../controllers/expense";
// const router=express.Router();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// router.post("/expenses", authenticateToken, expenseController.addexpense);
// router.get("/expenses", authenticateToken, expenseController.getAllexpense);
// router.delete("/expenses/:id", authenticateToken, expenseController.deleteselectedexpense);
// router.patch("/expenses/:id", authenticateToken, expenseController.updateselectedexpense);
// router.get("/expenses/:id", authenticateToken, expenseController.getselectedexpense);
// export default router;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const expense_1 = __importDefault(require("../controller/expense"));
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   - name: "Expense Routes"
 *     description: "Endpoints for expense management"
 *
 * paths:
 *   /expenses:
 *     post:
 *       tags:
 *         - "Expense Routes"
 *       summary: Add a new expense
 *       description: Adds a new expense, requires authentication
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 amount:
 *                   type: number
 *                 category:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date
 *       responses:
 *         201:
 *           description: Expense added successfully
 *     get:
 *       tags:
 *         - "Expense Routes"
 *       summary: Get all expenses
 *       description: Retrieves all expenses, requires authentication
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: List of expenses retrieved successfully
 *   /expenses/{id}:
 *     get:
 *       tags:
 *         - "Expense Routes"
 *       summary: Get an expense by ID
 *       description: Retrieves an expense by ID, requires authentication
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Expense retrieved successfully
 *     delete:
 *       tags:
 *         - "Expense Routes"
 *       summary: Delete an expense
 *       description: Deletes an expense by ID, requires authentication
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Expense deleted successfully
 *     patch:
 *       tags:
 *         - "Expense Routes"
 *       summary: Update an expense
 *       description: Updates an expense by ID, requires authentication
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 amount:
 *                   type: number
 *                 category:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date
 *       responses:
 *         200:
 *           description: Expense updated successfully
 */
router.post("/expenses", auth_1.default, expense_1.default.addExpense);
router.get("/expenses", auth_1.default, expense_1.default.getAllExpense);
router.get("/expenses/:id", auth_1.default, expense_1.default.getSelectedExpense);
router.delete("/expenses/:id", auth_1.default, expense_1.default.deleteSelectedExpense);
router.patch("/expenses/:id", auth_1.default, expense_1.default.updateSelectedExpense);
exports.default = router;
