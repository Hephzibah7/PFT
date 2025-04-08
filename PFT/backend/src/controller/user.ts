import {Request, Response, NextFunction} from "express";
import validator from "email-validator";
import bcrypt from "bcrypt";
import db from "../config/db";
import { QueryTypes } from "sequelize";
import { emit } from "process";
import { error } from "console";
import jwt from "jsonwebtoken";
import userType from "../type/userType";
import userRepo from "../repositary/user";
import { verify } from "crypto";
import verifyToken from "../helper/verifyToken";

const SECRET_KEY = process.env.SECRET_KEY as string;

async function addUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      userRepo.addUser(req.body, next);
      // Return success response
      res.status(200).json({ message: 'User successfully added' });
    } catch (error) {
      // Pass any error to the global error handler middleware
      next(error);
    }
  }
  
 

  async function login(req: Request, res: Response, next: NextFunction) {
    try {
      const token= await userRepo.login(req.body, next);
      res.json({ token });
    } catch (error) {
      next(error); // Pass to global error handler
    }
  }
  
  async function getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await userRepo.getAllUsers(next);
      res.json(users);
    } catch (error) {
      next(error); // Pass to global error handler
    }
  }
  
  async function getSelectedUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {userId} = verifyToken(req);
      const user= await userRepo.getSelectedUser(userId, next);

      res.json(user[0]);
    } catch (error) {
      next(error); // Pass to global error handler
    }
  }
  
  async function updateSelectedUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.userId;
      const body = req.body;
      userRepo.updateSelectedUser(id, body, next);
  
      res.status(200).json({ message: 'Successfully updated the user details' });
    } catch (error) {
      next(error); // Pass to global error handler
    }
  }
  
  async function logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.clearCookie('authToken', {
        path: '/',
        secure: true,
        sameSite: 'strict',
      });
  
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      next(error); // Pass to global error handler
    }
  }
  
  const userController = {
    addUser:addUser,
    login:login,
    logout:logout,
    getAllUsers:getAllUsers,
    getSelectedUser:getSelectedUser,
    updateSelectedUser:updateSelectedUser
  };
  
  export default userController;