"use strict";
// import express from "express";
// import authenticateToken from "../middleware/auth";
// import categoryController from "../controllers/category";
// const router=express.Router();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// router.post("/categories", authenticateToken, categoryController.addcategory);
// router.get("/categories",authenticateToken,  categoryController.getAllcategory);
// export default router;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const category_1 = __importDefault(require("../controller/category"));
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   - name: "Category Routes"
 *     description: "Endpoints for category management"
 *
 * paths:
 *   /categories:
 *     post:
 *       tags:
 *         - "Category Routes"
 *       summary: Add a new category
 *       description: Adds a new category, requires authentication
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *       responses:
 *         201:
 *           description: Category created successfully
 *     get:
 *       tags:
 *         - "Category Routes"
 *       summary: Get all categories
 *       description: Retrieves all categories, requires authentication
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: List of categories retrieved successfully
 */
router.post("/categories", auth_1.default, category_1.default.addCategory);
router.get("/categories", category_1.default.getAllCategory);
exports.default = router;
