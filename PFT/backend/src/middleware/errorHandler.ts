import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import errorType from '../type/errorType';
import CustomError from './CustomError';
// Custom error handler middleware
async function errorHandler(
  err: CustomError, // The error object passed from previous middleware
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> {
  console.log("hello");
  // Log the error for debugging purposes

  // Default status and message
  let message = err.message || 'Internal Server Error';
  let statusCode = err.status || 500

  // Send the error response
  res.status(statusCode).json({
    success: false,
    message,
  });


  
}

export default errorHandler;
