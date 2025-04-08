"use strict";
// import express from "express";
// import authenticateToken from "../middleware/auth";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import queryController from "../controllers/query";
// const router=express.Router();
// router.get("/totalincome", authenticateToken, queryController.totalincome);
// router.get("/totalexpense", authenticateToken, queryController.totalexpense);
// router.get("/month/:year", authenticateToken, queryController.getByMonth);
// router.get("/categorydata", authenticateToken, queryController.getByCategory);
// export default router;
/**
 * @swagger
 * tags:
 *   - name: "Query Routes"
 *     description: "Endpoints for querying financial data"
 *
 * paths:
 *   /totalincome:
 *     get:
 *       tags:
 *         - "Query Routes"
 *       summary: Get total income
 *       description: Retrieves the total income, requires authentication
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: Total income retrieved successfully
 *
 *   /totalexpense:
 *     get:
 *       tags:
 *         - "Query Routes"
 *       summary: Get total expense
 *       description: Retrieves the total expense, requires authentication
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: Total expense retrieved successfully
 *
 *   /month/{year}:
 *     get:
 *       tags:
 *         - "Query Routes"
 *       summary: Get data by month
 *       description: Retrieves financial data by month for a given year, requires authentication
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: year
 *           in: path
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: Monthly data retrieved successfully
 *
 *   /categorydata:
 *     get:
 *       tags:
 *         - "Query Routes"
 *       summary: Get data by category
 *       description: Retrieves financial data categorized by different expense or income categories, requires authentication
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: Category-based data retrieved successfully
 */
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const query_1 = __importDefault(require("../controller/query"));
const router = express_1.default.Router();
router.get("/totalincome", auth_1.default, query_1.default.totalIncome);
router.get("/totalexpense", auth_1.default, query_1.default.totalExpense);
router.get("/month/:year", auth_1.default, query_1.default.getByMonth);
router.get("/categorydata", auth_1.default, query_1.default.getByCategory);
router.get("/incomesdesc", auth_1.default, query_1.default.getDescIncomes);
router.get("/expensesdesc", auth_1.default, query_1.default.getDescExpenses);
router.get("/categoryper", auth_1.default, query_1.default.getCategoryPercentage);
exports.default = router;
