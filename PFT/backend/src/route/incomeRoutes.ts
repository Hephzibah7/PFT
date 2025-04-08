// import express from "express";
// import authenticateToken from "../middleware/auth";
// import incomeController from "../controllers/income";

// const router=express.Router();

// router.post("/incomes", authenticateToken, incomeController.addincome);
// router.get("/incomes", authenticateToken, incomeController.getAllincome);
// router.get("/incomes/:id", authenticateToken, incomeController.getselectedincome);
// router.delete("/incomes/:id", authenticateToken, incomeController.deleteselectedincome);
// router.patch("/incomes/:id", authenticateToken, incomeController.updateselectedincome);

// export default router;


import express from "express";
import authenticateToken from "../middleware/auth";
import incomeController from "../controller/income";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: "Income Routes"
 *     description: "Endpoints for income management"
 * 
 * paths:
 *   /incomes:
 *     post:
 *       tags:
 *         - "Income Routes"
 *       summary: Add a new income entry
 *       description: Adds a new income record, requires authentication
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
 *                 source:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date
 *       responses:
 *         201:
 *           description: Income entry created successfully
 *     get:
 *       tags:
 *         - "Income Routes"
 *       summary: Get all income records
 *       description: Retrieves all income records, requires authentication
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: List of income records retrieved successfully
 *   /incomes/{id}:
 *     get:
 *       tags:
 *         - "Income Routes"
 *       summary: Get an income record by ID
 *       description: Retrieves a specific income record by ID, requires authentication
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
 *           description: Income record retrieved successfully
 *     delete:
 *       tags:
 *         - "Income Routes"
 *       summary: Delete an income record
 *       description: Deletes an income record by ID, requires authentication
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
 *           description: Income record deleted successfully
 *     patch:
 *       tags:
 *         - "Income Routes"
 *       summary: Update an income record
 *       description: Updates an income record by ID, requires authentication
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
 *                 source:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date
 *       responses:
 *         200:
 *           description: Income record updated successfully
 */

router.post("/incomes", authenticateToken, incomeController.addIncome);
router.get("/incomes", authenticateToken, incomeController.getAllIncome);
router.get("/incomes/:id", authenticateToken, incomeController.getSelectedIncome);
router.delete("/incomes/:id", authenticateToken, incomeController.deleteSelectedIncome);
router.patch("/incomes/:id", authenticateToken, incomeController.updateSelectedIncome);

export default router;