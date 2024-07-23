"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const UserModels_1 = __importDefault(require("../../models/User/UserModels"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const access_secret = process.env.USER_ACCESS_TOKEN_SECRET;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'missing fields' });
        }
        const user = yield UserModels_1.default.findOne({ $or: [{ username }, { email: username }] });
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        console.log(access_secret);
        if (!bcrypt_1.default.compareSync(password, user.password)) {
            return res.status(400).json({ message: "invalid login details" });
        }
        const access_token = jsonwebtoken_1.default.sign({ user: user.username }, access_secret);
        res.cookie('_access_token_', access_token, { path: "/", sameSite: "none", maxAge: 1000 * 60 * 60 * 8, secure: true, httpOnly: true, });
        return res.status(200).json({ message: "login success" });
    }
    catch (error) {
        console.log(error);
    }
});
exports.login = login;
