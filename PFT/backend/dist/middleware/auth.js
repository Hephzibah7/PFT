"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = "your_secret_key";
async function authenticateToken(req, res, next) {
    try {
        const rtoken = req.header("Authorization");
        const token = rtoken.replace('Bearer ', '');
        console.log(token);
        if (!token) {
            res.status(401).json({ error: "Access denied" });
            console.log("hello");
            res.send("/login");
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, "your_secret_key");
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ error: "Invalid token" });
    }
}
exports.default = authenticateToken;
