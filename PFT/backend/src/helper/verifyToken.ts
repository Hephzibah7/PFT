import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import PayloadType from "../type/payloadType";

// Helper function to extract and verify JWT token
const SECRET_KEY = process.env.SECRET_KEY as string;
const verifyToken = (req: Request): PayloadType => {
    const rtoken = req.header("Authorization");
    if (!rtoken) {
      throw { status: 401, message: "Authorization token is required" };
    }
  
    const token = rtoken.replace("Bearer ", "");
    return jwt.verify(token, SECRET_KEY) as PayloadType;
  };

  export default verifyToken;