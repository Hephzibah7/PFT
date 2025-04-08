


import { Request, Response, NextFunction } from "express";
import db from "../config/db";
import { QueryTypes } from "sequelize";
import verifyToken from "../helper/verifyToken";
import expenseRepo from "../repositary/expense";


/**
 * Adds a new expense to the database.
 * @param req - Express request object containing expense details (amount, category, description).
 * @param res - Express response object.
 * @param next - Express next function for error handling.
 */
async function addExpense(req: Request, res: Response, next: NextFunction):Promise<void> {
  try {
    const { amount, category, description } = req.body;
    const { userId } = verifyToken(req);
    const expense={
      amount:amount,
      category:category,
      description:description,
      userId:userId
    }
    await expenseRepo.addExpense(expense, next);
    res.status(200).json({ message: "Successfully added the expense details" });
  } catch (error) {
    next(error);
  }
}

/**
 * Retrieves a specific expense by ID.
 * @param req - Express request object containing expense ID in params.
 * @param res - Express response object.
 * @param next - Express next function for error handling.
 */
async function getSelectedExpense(req: Request, res: Response, next: NextFunction):Promise<void> {
  try {
    const { id } = req.params;
    const { userId } = verifyToken(req);

    const expense= await expenseRepo.getSelectedExpense(id, userId, next);

    if (expense.length === 0) {
     res.status(404).json({ error: "Expense not found" });
     return;
    }
    res.json(expense[0]);
  } catch (error) {
    next(error);
  }
}

/**
 * Retrieves the latest 5 expenses for the logged-in user.
 * @param req - Express request object.
 * @param res - Express response object containing all expenses for a particular user
 * @param next - Express next function for error handling.
 */
async function getAllExpense(req: Request, res: Response, next: NextFunction):Promise<void> {
  try {
    const { userId } = verifyToken(req);
    const { page , limit  } = req.query; 
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    console.log(typeof userId);
    const expenses=await expenseRepo.getAllExpense(userId, pageNumber, limitNumber, next);
    const length=await expenseRepo.getAllExpensesLength(userId, next);
    const totalPage=Math.ceil(Number(length)/limitNumber);
    const data={
      totalPage:totalPage,
      expenses:expenses
    }
    res.json(data); 
  } catch (error) {
    next(error);
  }
}

/**
 * Deletes a selected expense by ID.
 * @param req - Express request object containing expense ID in params.
 * @param res - Express response object.
 * @param next - Express next function for error handling.
 */
async function deleteSelectedExpense(req: Request, res: Response, next: NextFunction):Promise<void> {
  try {
    const { id } = req.params;
    await expenseRepo.deleteSelectedExpense(id, next);
    res.status(200).json({ message: "Successfully deleted the expense details" });
  } catch (error) {
    next(error);
  }
}

/**
 * Updates a selected expense by ID.
 * @param req - Express request object containing updated expense details in the body.
 * @param res - Express response object.
 * @param next - Express next function for error handling.
 */
async function updateSelectedExpense(req: Request, res: Response, next: NextFunction):Promise<void> {
  try {
    const { id } = req.params;
    const { userId } = verifyToken(req);
    const body = {...req.body, userId:userId};

    if (Object.keys(body).length === 0) {
     res.status(400).json({ error: "At least one field is required to update" });
     return;
    }

   await expenseRepo.updateSelectedExpense(id, body, next)
    res.json({ message: "Successfully updated the expense details" });
  } catch (error) {
    next(error);
  }
}

//  Export Controller
const expenseController = {
  addExpense,
  getAllExpense,
  deleteSelectedExpense,
  updateSelectedExpense,
  getSelectedExpense,
};

export default expenseController;
