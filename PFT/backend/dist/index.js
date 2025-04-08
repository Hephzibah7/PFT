"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db")); // Import the database connection
const user_1 = __importDefault(require("./model/user"));
const income_1 = __importDefault(require("./model/income"));
const expense_1 = __importDefault(require("./model/expense"));
const emi_1 = __importDefault(require("./model/emi"));
const userRoutes_1 = __importDefault(require("./route/userRoutes"));
const loan_1 = __importDefault(require("./model/loan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const category_1 = __importDefault(require("./model/category"));
const incomeRoutes_1 = __importDefault(require("./route/incomeRoutes"));
const expenseRoutes_1 = __importDefault(require("./route/expenseRoutes"));
const categoryRoutes_1 = __importDefault(require("./route/categoryRoutes"));
const queryRoutes_1 = __importDefault(require("./route/queryRoutes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const budget_1 = __importDefault(require("./model/budget"));
const budgetRoutes_1 = __importDefault(require("./route/budgetRoutes"));
// Load environment variables hello
dotenv_1.default.config();
const app = (0, express_1.default)();
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
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use((0, cookie_parser_1.default)());
// Register Swagger UI
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
const allowedorigins = [
    "http://localhost:5173",
    "http://10.116.21.80:5173"
];
// Middleware
app.use((0, cors_1.default)({
    origin: allowedorigins,
    credentials: true
}));
app.use(express_1.default.json());
db_1.default.dbConnect();
app.use("/", userRoutes_1.default);
app.use("/", incomeRoutes_1.default);
app.use("/", expenseRoutes_1.default);
app.use("/", categoryRoutes_1.default);
app.use("/", queryRoutes_1.default);
app.use("/", budgetRoutes_1.default);
db_1.default.user = user_1.default;
db_1.default.income = income_1.default;
db_1.default.expense = expense_1.default;
db_1.default.emi = emi_1.default;
db_1.default.loan = loan_1.default;
db_1.default.category = category_1.default;
db_1.default.budget = budget_1.default;
app.use(errorHandler_1.default);
// Sync Models with Database
db_1.default.sequelize
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
