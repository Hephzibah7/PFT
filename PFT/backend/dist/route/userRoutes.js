"use strict";
// import express from "express";
// import userController from "../controllers/user";
// import authenticateToken from "../middleware/auth";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router=express.Router();
// router.post("/signup",  userController.adduser);
// router.post("/login", userController.login);
// router.get("/users", authenticateToken, userController.getAllusers);
// router.get("/users/{userId}", authenticateToken, userController.getselecteduser);
// router.patch("/users/{userId", authenticateToken, userController.updateselecteduser);
// export default router;
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../controller/user"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
// User-related routes
/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: User, Department, Doctor API
 *   description: API endpoints for managing users, departments, and doctors
 *   version: 1.0.0
 * servers:
 *   - url: http://localhost:3000
 *     description: Local Development Server
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * tags:
 *   - name: "User Routes"
 *     description: "Endpoints for user management"
 *
 * paths:
 *   /signup:
 *     post:
 *       tags:
 *         - "User Routes"
 *       summary: Register a new user
 *       description: Creates a new user account
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *       responses:
 *         201:
 *           description: User registered successfully
 *   /login:
 *     post:
 *       tags:
 *         - "User Routes"
 *       summary: Login user
 *       description: Authenticates a user and returns a token
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *       responses:
 *         200:
 *           description: Login successful, token returned
 *   /users:
 *     get:
 *       tags:
 *         - "User Routes"
 *       summary: Get all users
 *       description: Retrieves all users, requires authentication
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: Returns list of users
 *   /users/{userId}:
 *     get:
 *       tags:
 *         - "User Routes"
 *       summary: Get user by ID
 *       description: Retrieves a specific user by ID, requires authentication
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: userId
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: User retrieved successfully
 *     patch:
 *       tags:
 *         - "User Routes"
 *       summary: Update user by ID
 *       description: Updates details of a specific user by ID, requires authentication
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: userId
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *       responses:
 *         200:
 *           description: User updated successfully
 *   /logout:
 *     post :
 *       tags:
 *         - "User Routes"
 *       summary: Logs out current user
 *       description: Logs out user
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: User logged out successfully
 */
router.post("/signup", user_1.default.addUser);
router.post("/login", user_1.default.login);
router.get("/users", auth_1.default, user_1.default.getAllUsers);
router.get("/user", auth_1.default, user_1.default.getSelectedUser);
router.patch("/user/:userId", auth_1.default, user_1.default.updateSelectedUser);
router.post("/logout", user_1.default.logout);
exports.default = router;
