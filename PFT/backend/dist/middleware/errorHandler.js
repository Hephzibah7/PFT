"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Custom error handler middleware
async function errorHandler(err, // The error object passed from previous middleware
req, res, next) {
    console.log("hello");
    // Log the error for debugging purposes
    // Default status and message
    let message = err.message || 'Internal Server Error';
    let statusCode = err.status || 500;
    // Send the error response
    res.status(statusCode).json({
        success: false,
        message,
    });
}
exports.default = errorHandler;
