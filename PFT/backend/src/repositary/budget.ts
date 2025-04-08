import { NextFunction } from "express";
import expenseType from "../type/expenseType";
import verifyToken from "../helper/verifyToken";
import db from "../config/db";
import budgetType from "../type/budgetType";
import { QueryTypes } from "sequelize";
import budgetModalType from "../type/budgetModalType";
import CustomError from "../middleware/CustomError";

async function addBudget(budget: budgetType, next: NextFunction): Promise<budgetModalType[] | void | [number,number]> {
    try {
      const { amount, category, userId } = budget;
  
      // Validation check
      if (!amount || !category) {
        return next(new CustomError('Amount and Category are required', 400));
      }
  
      const createdAt = new Date();
      const updatedAt = new Date();
  
      // Perform the insert query
      const response = await db.sequelize.query(
        `INSERT INTO Budgets (userId, amount, category, createdAt, updatedAt) 
         VALUES (:userId, :amount, :category, :createdAt, :updatedAt)`,
        {
          replacements: { userId, amount, category, createdAt, updatedAt },
          type: QueryTypes.INSERT,
        }
      );
  
      // Check if the insert was successful (optional)
      if (response) {
        return response;
      }
  
      // If insertion failed, you could throw an error
      return next(new CustomError('Failed to add the budget', 500));
  
    } catch (error) {
      // Pass error to the next middleware
      next(error);
    }
  }
  


const budgetRepo={
    addBudget:addBudget
}

export default budgetRepo;