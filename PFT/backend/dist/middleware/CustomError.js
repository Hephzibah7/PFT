"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Create a custom error class
class CustomError extends Error {
    status;
    constructor(message, statusCode) {
        super(message);
        this.status = statusCode;
        this.name = 'CustomError';
    }
}
exports.default = CustomError;
