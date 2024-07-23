"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const access_secret = process.env.USER_ACCESS_TOKEN_SECRET;
function authenticateUser(req, res, next) {
    try {
        if (!req.cookies._access_token_) {
            return res.status(401).json({ message: 'you are not authorized here' });
        }
        const username = jsonwebtoken_1.default.verify(req.cookies._access_token_, access_secret);
        if (!username) {
            return res.status(400).json({ message: 'please log in' });
        }
        req.user = username.user;
        next();
    }
    catch (error) {
        console.log(error);
    }
}
exports.authenticateUser = authenticateUser;
