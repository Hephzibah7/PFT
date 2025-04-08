"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Helper function to extract and verify JWT token
const SECRET_KEY = process.env.SECRET_KEY;
const verifyToken = (req) => {
    const rtoken = req.header("Authorization");
    if (!rtoken) {
        throw { status: 401, message: "Authorization token is required" };
    }
    const token = rtoken.replace("Bearer ", "");
    return jsonwebtoken_1.default.verify(token, SECRET_KEY);
};
exports.default = verifyToken;
