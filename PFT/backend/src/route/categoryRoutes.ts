// import express from "express";
// import authenticateToken from "../middleware/auth";
// import categoryController from "../controllers/category";
// const router=express.Router();

// router.post("/categories", authenticateToken, categoryController.addcategory);
// router.get("/categories",authenticateToken,  categoryController.getAllcategory);

// export default router;


import express from "express";
import authenticateToken from "../middleware/auth";
import categoryController from "../controller/category";

const router = express.Router();

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

router.post("/categories", authenticateToken, categoryController.addCategory);
router.get("/categories",  categoryController.getAllCategory);

export default router;