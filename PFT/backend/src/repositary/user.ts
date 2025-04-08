import validator from "email-validator";
import bcrypt from "bcrypt";
import db from "../config/db";
import { QueryTypes } from "sequelize";
import userDataType from "../type/userDataType";
import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import userAuthType from "../type/userAuthType";
import userType from "../type/userType";
import userModalType from "../type/userModalType";

const SECRET_KEY = process.env.SECRET_KEY as string;

async function addUser(user:userDataType, next:NextFunction): Promise<void> {
    try {
      const { username, firstname, lastname, email, password } = user;
  
      // Validate required fields
      if (!username) {
        return next(new Error('Username is required'));
      }
      if (!email) {
        return next(new Error('Email is required'));
      }
      if (!password) {
        return next(new Error('Password is required'));
      }
  
      // Validate email format
      const isValid = validator.validate(email);
      if (!isValid) {
        return next(new Error('Email is not valid'));
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      const createdAt = new Date();
      const updatedAt = new Date();
  
      // Check if user already exists
      const checkUser = await db.sequelize.query(`SELECT * FROM Users WHERE email=:email`, {
        replacements: { email },
        type: QueryTypes.SELECT,
      });
  
      if (checkUser.length !== 0) {
        return next(new Error('User already exists'));
      }
  
      // Insert the new user into the database
      await db.sequelize.query(
        `INSERT INTO Users (username, firstname, lastname, email, password, createdAt, updatedAt) 
        VALUES (:username, :firstname, :lastname, :email, :password, :createdAt, :updatedAt)`,
        {
          replacements: { username, firstname, lastname, email, password: hashedPassword, createdAt, updatedAt },
          type: QueryTypes.INSERT,
        }
      );


    } catch (error) {
      // Pass any error to the global error handler middleware
      next(error);
    }
  }



 async function login(userlog:userAuthType, next: NextFunction):Promise<string|void> {
    try {
      const { email, password } = userlog;
  
      if (!email || !password) {
        return next(new Error('Email and password cannot be empty'));
      }
  
      const user: userType[] = await db.sequelize.query(`SELECT * FROM Users WHERE email=:email`, {
        replacements: { email },
        type: QueryTypes.SELECT,
      });
  
      if (user.length === 0) {
        return next(new Error('User does not exist'));
      }
  
      const isPasswordValid = await bcrypt.compare(password, user[0].password);
      if (!isPasswordValid) {
        return next(new Error('Invalid credentials'));
      }
  
      const token = jwt.sign(
        { userId: user[0].id, username: user[0].username, email: user[0].email },
        SECRET_KEY,
        { expiresIn: '10h' }
      );
       
      return token as string;

    } catch (error) {
      next(error); // Pass to global error handler
    }
  }

  async function getAllUsers(next: NextFunction):Promise<userModalType[]|void> {
    try {
      const users = await db.sequelize.query('SELECT * FROM Users');
      return users as userModalType[];
    } catch (error) {
      next(error); // Pass to global error handler
    }
  }

  async function getSelectedUser(id:number, next: NextFunction): Promise<userModalType[]> {
    try {
      const user = await db.sequelize.query('SELECT * FROM Users WHERE id=:id', {
        replacements: { id },
        type: QueryTypes.SELECT,
      });

      return user as userModalType[];
  
    } catch (error) {
      next(error); // Pass to global error handler
      return [];
    }
  }

  async function updateSelectedUser(id:string, body:userModalType, next: NextFunction): Promise<void> {
    try {
      const updatedAt = new Date();
  
      let col = '';
      Object.keys(body).forEach((key) => {
        col += `${key}=:${key},`;
      });
  
      const query = `UPDATE Users SET ${col} updatedAt=:updatedAt AND id:id`;
  
      await db.sequelize.query(query, {
        replacements: {  ...body , updatedAt, id},
        type: QueryTypes.UPDATE,
      });
  
    } catch (error) {
      next(error); // Pass to global error handler
    }
  }
  
  const userRepo={
    addUser:addUser,
    login:login,
    getAllUsers:getAllUsers,
    getSelectedUser:getSelectedUser,
    updateSelectedUser:updateSelectedUser
  }

  export default userRepo;

