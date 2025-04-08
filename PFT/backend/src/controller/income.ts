


import { Request, Response, NextFunction } from "express";
import db from "../config/db";
import { QueryTypes } from "sequelize";
import verifyToken from "../helper/verifyToken";
import dotenv from "dotenv";
import incomeRepo from "../repositary/income";
import expenseRepo from "../repositary/expense";

// Load environment variables
dotenv.config();

/**
 * Adds a new income record for the authenticated user.
 * 
 * @param req - Express request object containing amount and description in the body.
 * @param res - Express response object to send the success message.
 * @param next - Express next function to handle errors.
 */
async function addIncome(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { amount, description } = req.body;
    const { userId } = verifyToken(req);
    await incomeRepo.addIncome(amount, description, userId, next);
   
    res.status(201).json({ message: "Income added successfully" });
  } catch (error) {
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
async function getAllIncome(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { userId } = verifyToken(req);
    const { page , limit  } = req.query; 
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
   const income=await incomeRepo.getAllIncome(userId, pageNumber, limitNumber, next);
   console.log(income);
   const length=await incomeRepo.getAllIncomesLength(userId, next);
   const totalPage=Math.ceil(Number(length)/limitNumber);
   const data={
    totalPage:totalPage,
    income:income
  }
    res.status(200).json(data);
  } catch (error) {
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
async function getSelectedIncome(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const { userId } = verifyToken(req);

   const income=await incomeRepo.getSelectedIncome(id, userId, next);

    if (!income.length) {
      res.status(404).json({ error: "Income not found" });
      return;
    }

    res.status(200).json(income[0]);
  } catch (error) {
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
async function deleteSelectedIncome(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const { userId } = verifyToken(req);

    await incomeRepo.deleteSelectedIncome(id, userId,next);

    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
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
async function updateSelectedIncome(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const { userId } = verifyToken(req);
    const body = req.body;
    

  await incomeRepo.updateSelectedIncome(id,userId,body,next);

    res.status(201).json({ message: "Income updated successfully" });
  } catch (error) {
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

export default incomeController;
