"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const start = Date.now();
setTimeout(() => console.log("Timer 1 expired"), 0);
fs_1.default.readFile("text-file.txt", () => {
    console.log("I/O finished");
    setTimeout(() => console.log("Timer 2 expired"), 0);
    setImmediate(() => console.log("setImmediate 1 finished"));
    crypto_1.default.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now() - start, "Password encrypted 1");
    });
    crypto_1.default.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now() - start, "Password encrypted 2");
    });
});
console.log("Top-level code");
