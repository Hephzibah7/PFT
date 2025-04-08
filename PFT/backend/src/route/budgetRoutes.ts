import express from "express";
import authenticateToken from "../middleware/auth";
import budgetController from "../controller/budget";



const router = express.Router();

router.post("/budgets", authenticateToken, budgetController.addBudget);

export default router;