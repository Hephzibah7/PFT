// import express from "express";
// import authenticateToken from "../middleware/auth";

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

import express from "express";
import authenticateToken from "../middleware/auth";
import queryController from "../controller/query";

const router = express.Router();

router.get("/totalincome", authenticateToken, queryController.totalIncome);
router.get("/totalexpense", authenticateToken, queryController.totalExpense);
router.get("/month/:year", authenticateToken, queryController.getByMonth);
router.get("/categorydata", authenticateToken, queryController.getByCategory);
router.get("/incomesdesc", authenticateToken, queryController.getDescIncomes);
router.get("/expensesdesc", authenticateToken, queryController.getDescExpenses);
router.get("/categoryper", authenticateToken, queryController.getCategoryPercentage);
router.get("/budgetdetails", authenticateToken, queryController.getBudgetDetails);
router.get("/yearlydetails", authenticateToken, queryController.getYearlyDetails);

export default router;