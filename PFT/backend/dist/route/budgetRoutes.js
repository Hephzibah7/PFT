"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const budget_1 = __importDefault(require("../controller/budget"));
const router = express_1.default.Router();
router.post("/budgets", auth_1.default, budget_1.default.addBudget);
exports.default = router;
