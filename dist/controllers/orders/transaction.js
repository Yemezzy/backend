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
exports.addTransaction = void 0;
const UserModels_1 = __importDefault(require("../../models/User/UserModels"));
const addTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { payment_method, address, amount } = req.body;
    try {
        if (!req.user) {
            return res.status(403).json({ message: "you are not authorised" });
        }
        if (!payment_method || !address || !amount) {
            return res.status(400).json({ message: "missing fields" });
        }
        if (amount < 49) {
            return res
                .status(400)
                .json({ message: "Payment must be 50$ and above" });
        }
        const user = yield UserModels_1.default.findOne({ username: req.user });
        if (!user) {
            return res.status(403).json({ message: "user not found" });
        }
        // const transaction = user.transaction || []
        // const newTransaction = [...transaction, { amount, address, payment_method }]
        // user.transaction = newTransaction
        user.transaction.push({ amount, address, payment_method });
        user.save();
    }
    catch (error) {
        console.log(error);
    }
});
exports.addTransaction = addTransaction;
