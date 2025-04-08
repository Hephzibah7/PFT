"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../repositary/user"));
const verifyToken_1 = __importDefault(require("../helper/verifyToken"));
const SECRET_KEY = process.env.SECRET_KEY;
async function addUser(req, res, next) {
    try {
        user_1.default.addUser(req.body, next);
        // Return success response
        res.status(200).json({ message: 'User successfully added' });
    }
    catch (error) {
        // Pass any error to the global error handler middleware
        next(error);
    }
}
async function login(req, res, next) {
    try {
        const token = await user_1.default.login(req.body, next);
        res.json({ token });
    }
    catch (error) {
        next(error); // Pass to global error handler
    }
}
async function getAllUsers(req, res, next) {
    try {
        const users = await user_1.default.getAllUsers(next);
        res.json(users);
    }
    catch (error) {
        next(error); // Pass to global error handler
    }
}
async function getSelectedUser(req, res, next) {
    try {
        const { userId } = (0, verifyToken_1.default)(req);
        const user = await user_1.default.getSelectedUser(userId, next);
        res.json(user[0]);
    }
    catch (error) {
        next(error); // Pass to global error handler
    }
}
async function updateSelectedUser(req, res, next) {
    try {
        const id = req.params.userId;
        const body = req.body;
        user_1.default.updateSelectedUser(id, body, next);
        res.status(200).json({ message: 'Successfully updated the user details' });
    }
    catch (error) {
        next(error); // Pass to global error handler
    }
}
async function logout(req, res, next) {
    try {
        res.clearCookie('authToken', {
            path: '/',
            secure: true,
            sameSite: 'strict',
        });
        res.status(200).json({ message: 'Logged out successfully' });
    }
    catch (error) {
        next(error); // Pass to global error handler
    }
}
const userController = {
    addUser: addUser,
    login: login,
    logout: logout,
    getAllUsers: getAllUsers,
    getSelectedUser: getSelectedUser,
    updateSelectedUser: updateSelectedUser
};
exports.default = userController;
