import { QueryTypes } from "sequelize";
import { emit } from "process";
import { error } from "console";
import userDataType from "../type/userDataType";
import { NextFunction } from "express";
import expenseType from "../type/expenseType";
import verifyToken from "../helper/verifyToken";
import db from "../config/db";
import expenseModalType from "../type/expenseModalType";

async function addExpense(expense:expenseType, next: NextFunction):Promise<void> {
    try {
      const { amount, category, description, userId } = expense;
      if (!amount || !category || !description) {
          return next(new Error('Amount and Category are required'));
      }
  
      const createdAt = new Date();
      const updatedAt = new Date();
  
      await db.sequelize.query(
        `INSERT INTO Expenses (userId, amount, category, description, createdAt, updatedAt) 
         VALUES (:userId, :amount, :category, :description, :createdAt, :updatedAt)`,
        {
          replacements: { userId, amount, category, description, createdAt, updatedAt },
          type: QueryTypes.INSERT,
        }
      );
    } catch (error) {
      next(error);
    }
  }

  async function getSelectedExpense(id:string, userId:number, next: NextFunction):Promise<expenseModalType[]> {
    try {
      const expense = await db.sequelize.query(
        `SELECT * FROM Expenses WHERE userId = :userId AND id = :id`,
        {
          replacements: { userId, id },
          type: QueryTypes.SELECT,
        }
      );
      
      return expense as expenseModalType[];
      
    } catch (error) {
      next(error);
      return [];
    }
  }

  //  Get All Expenses (Latest 5)
async function getAllExpense(userId:number, pageNumber:number, limitNumber:number, next: NextFunction):Promise<expenseModalType[]> {
    try {

      const skip = (pageNumber - 1) * limitNumber;
      const expenses = await db.sequelize.query(
        `SELECT * FROM Expenses WHERE userId = :userId ORDER BY createdAt DESC LIMIT :limitNumber offset :skip`,
        {
          replacements: { userId, limitNumber, skip },
          type: QueryTypes.SELECT,
        }
      );

      
  
     return expenses as expenseModalType[];
    } catch (error) {
      next(error);
      return [];
    }
  }

  async function  getAllExpensesLength(userId:number, next:NextFunction){
    try{
      const expenses=await db.sequelize.query(`SELECT * from Expenses where userId=:userId`,{
        replacements:{userId},
        type:QueryTypes.SELECT
      })
      const length=expenses.length;
      return length as number;
    }
    catch (error) {
      next(error);
      return [];
    }
  }

  //  Delete Expense
async function deleteSelectedExpense(id:string, next: NextFunction):Promise<void> {
    try {
      
      const result = await db.sequelize.query(
        `DELETE FROM Expenses WHERE id = :id`,
        {
          replacements: { id },
          type: QueryTypes.DELETE,
        }
      );

      return result;
    } catch (error) {
      next(error);
    }
  }

  async function updateSelectedExpense(id:string,  body:expenseType, next: NextFunction):Promise<void> {
    try {
      const updatedAt = new Date();
  
      let setClauses = Object.keys(body)
        .map((key) => `${key} = :${key}`)
        .join(", ");
  
      const query = `UPDATE Expenses SET ${setClauses}, updatedAt = :updatedAt WHERE id = :id AND userId = :userId`;
  
      const result = await db.sequelize.query(query, {
        replacements: { ...body, updatedAt, id },
        type: QueryTypes.UPDATE,
      });
  
    } catch (error) {
      next(error);
    }
  }

  const expenseRepo={
    addExpense:addExpense,
    getSelectedExpense:getSelectedExpense,
    getAllExpense:getAllExpense,
    deleteSelectedExpense:deleteSelectedExpense,
    updateSelectedExpense:updateSelectedExpense,
    getAllExpensesLength:getAllExpensesLength
   
  }

  export default expenseRepo;