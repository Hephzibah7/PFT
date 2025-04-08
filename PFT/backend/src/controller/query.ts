
import { Request, Response, NextFunction } from "express";
import db from "../config/db";
import { QueryTypes, Sequelize } from "sequelize";
import verifyToken from "../helper/verifyToken";
import CustomError from "../middleware/CustomError";

async function totalIncome(req: Request, res: Response, next:NextFunction): Promise<void> {
    try {
      const { userId } = verifyToken(req);
    
      const response=await db.sequelize.query('SELECT SUM(amount) income FROM `Incomes` where userId=:userId',{
        replacements:{userId:userId},
        type:QueryTypes.SELECT
      })

     res.send(response);
     
  
    } catch (error) {
      next(error);
    }
  }

  async function totalExpense(req: Request, res: Response, next:NextFunction): Promise<void> {
    try {
      const { userId } = verifyToken(req);
    
      const response=await db.sequelize.query('SELECT SUM(amount) expense FROM `Expenses` where userId=:userId',{
        replacements:{userId:userId},
        type:QueryTypes.SELECT
      })

     res.send(response);
     
  
    } catch (error) {
      next(error);
    }
  }

  async function getByMonth(req: Request, res: Response, next:NextFunction): Promise<void> {
    try {
        const year=req.params.year;
        const { userId } = verifyToken(req);
    
      const response=await db.sequelize.query(`select sum(a.amount) incomes, sum(b.amount) expenses, monthname(a.createdAt) month  from Incomes a JOIN Expenses b where  year(a.createdAt)=:year AND a.userId=:userId group by month`,{
        replacements:{userId:userId, year:year},
        type:QueryTypes.SELECT
      })

     res.send(response);
     
  
    } catch (error) {
      next(error);
    }
  }

  async function getByCategory(req: Request, res: Response, next:NextFunction): Promise<void> {
    try {
        console.log("hello00000");
        const currentMonth=new Date().getMonth()+1;
        const { userId } = verifyToken(req);
    
      const response=await db.sequelize.query(`select SUM(amount)/(select SUM(amount) from Incomes)*100 percentage, category FROM Expenses where userId=:userId AND month(createdAt)=:month group by category ORDER BY percentage DESC LIMIT 3;`,{
        replacements:{userId:userId, month:currentMonth},
        type:QueryTypes.SELECT
      })

     res.send(response);
     
  
    } catch (error) {
      next(error);
    }
  }

  async function getDescIncomes(req: Request, res: Response, next:NextFunction): Promise<void> {
    try {
        
      const { userId } = verifyToken(req);
      const month=new Date().getMonth()+1;
    
      const response=await db.sequelize.query(`select description, amount from Incomes where userId=:userId AND month(createdAt)=:month order by amount DESC LIMIT 3;`,{
        replacements:{userId:userId, month:month},
        type:QueryTypes.SELECT
      })

     res.send(response);
     
  
    } catch (error) {
      next(error);
    }
  }

  async function getDescExpenses(req: Request, res: Response, next:NextFunction): Promise<void> {
    try {
        
      const { userId } = verifyToken(req);
      const month=new Date().getMonth()+1;
    
      const response=await db.sequelize.query(`select category, amount from Expenses where userId=:userId AND month(createdAt)=:month order by amount DESC LIMIT 3;`,{
        replacements:{userId:userId, month:month},
        type:QueryTypes.SELECT
      })

     res.send(response);
     
  
    } catch (error) {
      next(error);
    }
  }

  async function getCategoryPercentage(req: Request, res: Response, next:NextFunction): Promise<void> {
    try {
        
      const { userId } = verifyToken(req);
      const month=new Date().getMonth()+1;
    
      const response=await db.sequelize.query(`Select SUM(amount)/(Select SUM(amount) FROM Incomes where userId=:userId and month(createdAt)=:month)*100 percentage FROM Expenses where userId=:userId and month(createdAt)=:month`,{
        replacements:{userId:userId, month:month},
        type:QueryTypes.SELECT
      })

     res.send(response);
     
  
    } catch (error) {
      next(error);
    }
  }

  async function getBudgetDetails(req: Request, res: Response, next:NextFunction): Promise<void> {
    try {
        
      const { userId } = verifyToken(req);
      const month=new Date().getMonth()+1;
    
      const response=await db.sequelize.query(`SELECT a.category, a.amount AS budget, COALESCE(SUM(b.amount), 0) AS spent, a.amount - COALESCE(SUM(b.amount), 0) AS balance, COUNT(b.id) AS expense_count
FROM Budgets a LEFT JOIN Expenses b ON a.category = b.category AND MONTH(a.createdAt) = :month AND a.userId = :userId GROUP BY a.category, a.amount;
`,{
        replacements:{userId:userId, month:month},
        type:QueryTypes.SELECT
      })
     console.log(response);
     res.send(response);
     
  
    } catch (error) {
      next(error);
    }
  }

  async function getYearlyDetails(req: Request, res: Response, next:NextFunction): Promise<void> {
    try {
        
      const { userId } = verifyToken(req);
      const month=new Date().getMonth()+1;
    
      const response=await db.sequelize.query(`SELECT YEAR(a.createdAt) AS year, SUM(a.amount) AS total_income, SUM(b.amount) AS total_expense FROM Incomes a JOIN Expenses b ON YEAR(a.createdAt) = YEAR(b.createdAt) WHERE a.userId = :userId GROUP BY YEAR(a.createdAt);`,{
        replacements:{userId:userId},
        type:QueryTypes.SELECT
      })
     
      if(!response){
        next(new CustomError("Error fetching Data", 500))
      }
     res.send(response);
     
  
    } catch (error) {
      next(error);
    }
  }


  const queryController={
    totalIncome:totalIncome,
    totalExpense:totalExpense,
    getByMonth:getByMonth,
    getByCategory:getByCategory,
    getDescIncomes,
    getDescExpenses,
    getCategoryPercentage,
    getBudgetDetails,
    getYearlyDetails:getYearlyDetails
  }

  export default queryController;