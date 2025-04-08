"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const email_validator_1 = __importDefault(require("email-validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("../config/db"));
const sequelize_1 = require("sequelize");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = "your_secret_key";
async function adduser(req, res, next) {
    try {
        const { username, firstname, lastname, email, password } = req.body;
        // Validate required fields
        if (!username) {
            return next(new Error('Username is required'));
        }
        if (!email) {
            return next(new Error('Email is required'));
        }
        if (!password) {
            return next(new Error('Password is required'));
        }
        // Validate email format
        const isValid = email_validator_1.default.validate(email);
        if (!isValid) {
            return next(new Error('Email is not valid'));
        }
        // Hash the password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const createdAt = new Date();
        const updatedAt = new Date();
        // Check if user already exists
        const checkUser = await db_1.default.sequelize.query(`SELECT * FROM Users WHERE email=:email`, {
            replacements: { email },
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (checkUser.length !== 0) {
            return next(new Error('User already exists'));
        }
        // Insert the new user into the database
        await db_1.default.sequelize.query(`INSERT INTO Users (username, firstname, lastname, email, password, createdAt, updatedAt) 
        VALUES (:username, :firstname, :lastname, :email, :password, :createdAt, :updatedAt)`, {
            replacements: { username, firstname, lastname, email, password: hashedPassword, createdAt, updatedAt },
            type: sequelize_1.QueryTypes.INSERT,
        });
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
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new Error('Email and password cannot be empty'));
        }
        const user = await db_1.default.sequelize.query(`SELECT * FROM Users WHERE email=:email`, {
            replacements: { email },
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (user.length === 0) {
            return next(new Error('User does not exist'));
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user[0].password);
        if (!isPasswordValid) {
            return next(new Error('Invalid credentials'));
        }
        const token = jsonwebtoken_1.default.sign({ userId: user[0].id, username: user[0].username, email: user[0].email }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    }
    catch (error) {
        next(error); // Pass to global error handler
    }
}
async function getAllusers(req, res, next) {
    try {
        const users = await db_1.default.sequelize.query('SELECT * FROM Users');
        res.json(users);
    }
    catch (error) {
        next(error); // Pass to global error handler
    }
}
async function getselecteduser(req, res, next) {
    try {
        const id = req.params.userId;
        const user = await db_1.default.sequelize.query('SELECT * FROM Users WHERE id=:id', {
            replacements: { id },
            type: sequelize_1.QueryTypes.SELECT,
        });
        res.json(user);
    }
    catch (error) {
        next(error); // Pass to global error handler
    }
}
async function updateselecteduser(req, res, next) {
    try {
        const id = req.params.userId;
        const body = req.body;
        const updatedAt = new Date();
        let col = '';
        Object.keys(body).forEach((key) => {
            col += `${key}=:${key},`;
        });
        const query = `UPDATE Users SET ${col} updatedAt=:updatedAt`;
        await db_1.default.sequelize.query(query, {
            replacements: { updatedAt, ...body },
            type: sequelize_1.QueryTypes.UPDATE,
        });
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
    adduser: adduser,
    login: login,
    getAllusers: getAllusers,
    getselecteduser: getselecteduser,
    updateselecteduser: updateselecteduser,
    logout: logout,
};
exports.default = userController;
