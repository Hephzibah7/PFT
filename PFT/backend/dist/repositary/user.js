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
const SECRET_KEY = process.env.SECRET_KEY;
async function addUser(user, next) {
    try {
        const { username, firstname, lastname, email, password } = user;
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
    }
    catch (error) {
        // Pass any error to the global error handler middleware
        next(error);
    }
}
async function login(userlog, next) {
    try {
        const { email, password } = userlog;
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
        const token = jsonwebtoken_1.default.sign({ userId: user[0].id, username: user[0].username, email: user[0].email }, SECRET_KEY, { expiresIn: '10h' });
        return token;
    }
    catch (error) {
        next(error); // Pass to global error handler
    }
}
async function getAllUsers(next) {
    try {
        const users = await db_1.default.sequelize.query('SELECT * FROM Users');
        return users;
    }
    catch (error) {
        next(error); // Pass to global error handler
    }
}
async function getSelectedUser(id, next) {
    try {
        const user = await db_1.default.sequelize.query('SELECT * FROM Users WHERE id=:id', {
            replacements: { id },
            type: sequelize_1.QueryTypes.SELECT,
        });
        return user;
    }
    catch (error) {
        next(error); // Pass to global error handler
        return [];
    }
}
async function updateSelectedUser(id, body, next) {
    try {
        const updatedAt = new Date();
        let col = '';
        Object.keys(body).forEach((key) => {
            col += `${key}=:${key},`;
        });
        const query = `UPDATE Users SET ${col} updatedAt=:updatedAt AND id:id`;
        await db_1.default.sequelize.query(query, {
            replacements: { ...body, updatedAt, id },
            type: sequelize_1.QueryTypes.UPDATE,
        });
    }
    catch (error) {
        next(error); // Pass to global error handler
    }
}
const userRepo = {
    addUser: addUser,
    login: login,
    getAllUsers: getAllUsers,
    getSelectedUser: getSelectedUser,
    updateSelectedUser: updateSelectedUser
};
exports.default = userRepo;
