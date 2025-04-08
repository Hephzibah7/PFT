import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/db"; // Import the database connection
import User from "./model/user";
import Income from "./model/income";
import Expense from "./model/expense";
import Emi from "./model/emi";
import userRoutes from "./route/userRoutes";
import Loan from "./model/loan";
import cookieParser from "cookie-parser";
import Category from "./model/category";
import incomeRoutes from "./route/incomeRoutes"
import expenseRoutes from "./route/expenseRoutes"
import categoryRoutes from "./route/categoryRoutes"
import queryRoutes from "./route/queryRoutes"
import swaggerUi from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc"
import errorHandler from "./middleware/errorHandler";
import Budget from "./model/budget";
import budgetRoutes from "./route/budgetRoutes"


// Load environment variables hello
dotenv.config();


const app = express();

// Swagger Configuration
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "MERN Stack API Documentation",
    version: "1.0.0",
    description: "This is a REST API built with Express and TypeScript.",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "API Support",
      url: "https://example.com",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development Server",
    },
  ],
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ["./dist/routes/*.js"], // Ensure this points to your TypeScript route files
};



const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use(cookieParser());

// Register Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const allowedorigins=[
  "http://localhost:5173",
  "http://10.116.21.80:5173"
]
// Middleware
app.use(cors({
  origin:allowedorigins,
  credentials:true
}));
app.use(express.json());


db.dbConnect();

app.use("/", userRoutes);
app.use("/", incomeRoutes);
app.use("/", expenseRoutes);
app.use("/", categoryRoutes);
app.use("/", queryRoutes);
app.use("/", budgetRoutes);
db.user=User;
db.income=Income;
db.expense=Expense;
db.emi=Emi;
db.loan=Loan;
db.category=Category;
db.budget=Budget;

app.use(errorHandler);

// Sync Models with Database
db.sequelize
  .sync()
  .then(() => {
    console.log("Tables created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create tables:", error);
  });

 

  // Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

