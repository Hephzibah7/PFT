import { Request, Response, NextFunction } from "express";
import db from "../config/db";
import { QueryTypes } from "sequelize";
import CustomError from "../middleware/CustomError";


/**
 * Adds a new category to the database.
 * @param req - Express request object containing category and amount in the body.
 * @param res - Express response object.
 * @param next - Express next function for error handling.
 */
async function addCategory(req: Request, res: Response, next:NextFunction): Promise<void> {
  try {
    const {name}= req.body;
    if (!name) {
      res.status(400).json({ error: "category is missing" });
    }
    const category = await db.sequelize.query(
      `INSERT INTO Categories(name) VALUES(:name)`,{
        replacements: { name: name },
        type: QueryTypes.INSERT,
      });
      if(!category){
        next(new CustomError("Error fetching Data", 500))
      }
      res.status(200).json({message:"Successfully added"})
  } catch (error) {
    next(error);
  }
}

/**
 * Retrieves all categories from the database.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Express next function for error handling.
 */

async function getAllCategory(req: Request, res: Response, next:NextFunction): Promise<void> {
  try {
   
    const categories = await db.sequelize.query(`SELECT * From Categories`, {
      type: QueryTypes.SELECT,
    });
    res.send(categories);
  } catch (error) {
    next(error);
  }
}

const categoryController = {
  addCategory: addCategory,
  getAllCategory: getAllCategory,
};

export default categoryController;
