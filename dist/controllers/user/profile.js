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
exports.edit_profile = exports.get_profile = void 0;
const UserModels_1 = __importDefault(require("../../models/User/UserModels"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const get_profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.user;
        const user = yield UserModels_1.default.findOne({ username }).select(['-password', '-isVerified']);
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json('internal server error');
    }
});
exports.get_profile = get_profile;
const edit_profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.user;
        console.log(username);
        const userInDB = yield UserModels_1.default.findOne({ username });
        if (!userInDB) {
            return res.status(404).json({ message: "invalid authentication" });
        }
        const { firstname, lastname, email, password, confirm_password } = req.body;
        if (!firstname || !lastname || !email) {
            return res.status(400).json({ message: "missing field" });
        }
        userInDB.firstname = firstname;
        userInDB.lastname = lastname;
        userInDB.email = email;
        if (!password) {
            userInDB.save();
            return res.status(200).json({ message: "profile updated" });
        }
        if (password !== confirm_password) {
            return res.status(400).json({ message: "passwords do not match" });
        }
        const salt = bcrypt_1.default.genSaltSync(10);
        const hashedPassword = bcrypt_1.default.hashSync(password, salt);
        console.log();
        userInDB.password = hashedPassword;
        userInDB.save();
        return res.status(200).json({ message: "profile updated and password updated" });
    }
    catch (error) {
        return res.status(500).json({ message: "internal server error" });
    }
});
exports.edit_profile = edit_profile;
