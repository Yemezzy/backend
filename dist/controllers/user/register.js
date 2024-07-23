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
exports.register = void 0;
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const inputSchema_1 = require("../../utils/inputSchema");
const UserModels_1 = __importDefault(require("../../models/User/UserModels"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!inputSchema_1.schema.safeParse(req.body).success) {
            return res.status(400).json({ message: 'some fields are missing' });
        }
        const { firstname, lastname, username, email, password, confirm_password } = req.body;
        if (!zod_1.z.string().email().safeParse(email).success) {
            return res.status(400).json({ message: 'please enter a valid email address' });
        }
        if (!zod_1.z.string().min(8).safeParse(password).success) {
            return res.status(400).json({ message: 'passwords must be atleast 8 character length' });
        }
        if (password !== confirm_password) {
            return res.status(400).json({ message: "passwords do not match" });
        }
        const existing_user = yield UserModels_1.default.findOne({ $or: [{ email }, { username }] });
        if (existing_user) {
            return res.status(400).json({ message: "user exists" });
        }
        const salt = bcrypt_1.default.genSaltSync(10);
        const hashedPassword = bcrypt_1.default.hashSync(password, salt);
        const new_user = new UserModels_1.default({
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword
        });
        new_user.save();
        return res.status(200).json({ message: "user created" });
    }
    catch (error) {
        console.log(error);
    }
});
exports.register = register;
