import { Request, Response, NextFunction } from "express";
import db from "../config/db";
import { QueryTypes } from "sequelize";
import verifyToken from "../helper/verifyToken";
import budgetRepo from "../repositary/budget";

async function addBudget(req: Request, res: Response, next: NextFunction):Promise<void> {
    try {
        
      const { amount, category } = req.body;
      const { userId } = verifyToken(req);
      const budget={
        amount:amount,
        category:category,
        userId:userId
      }
     const response=await budgetRepo.addBudget(budget, next);
      console.log("bye");
      if(response){
        res.status(200).json({ message: "Successfully added Budget Details" });
      }
      
    } catch (error) {
      next(error);
    }
  }

const budgetController={
    addBudget:addBudget
}

export default budgetController;