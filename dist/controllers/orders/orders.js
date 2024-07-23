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
exports.getUserOrder = exports.getSingleOrder = exports.getAllorders = exports.deleteOrder = exports.updateOrder = exports.createOrder = void 0;
const OrderModel_1 = __importDefault(require("../../models/Orders/OrderModel"));
const zod_1 = require("zod");
const OrderCategoryModel_1 = __importDefault(require("../../models/OrderListing/category/OrderCategoryModel"));
const UserModels_1 = __importDefault(require("../../models/User/UserModels"));
const schema = zod_1.z.object({
    order_category_id: zod_1.z.string(),
    charge: zod_1.z.number(),
    link: zod_1.z.string().url(),
});
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.status(400).json({ message: "you are not logged in " });
        }
        const { link, order_id, charge } = req.body;
        if (!link || !order_id || !charge) {
            return res.status(400).json({ message: "Empty Inputs" });
        }
        if (!schema.safeParse({ link, order_category_id: order_id, charge }).success) {
            return res.status(400).json({ message: "invalid entry types " });
        }
        const order = yield OrderCategoryModel_1.default.findOne({ _id: order_id });
        if (!order) {
            return res.status(404).json({ message: "order category not  found" });
        }
        const user = yield UserModels_1.default.findOne({ username: req.user });
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        const newbalance = user.balance - charge;
        if (newbalance < 0) {
            return res.status(400).json({ message: "insufficent balance" });
        }
        user.balance = newbalance;
        const newOrder = new OrderModel_1.default({
            user: user._id,
            order_category_id: order._id,
            link,
            charge
        });
        user.save();
        newOrder.save();
        res.status(200).json({ message: "success" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
});
exports.createOrder = createOrder;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderid, status, username, amount } = req.body;
        if (!req.isAdmin) {
            return res.status(403).json({ message: "you are not authorised - LOGIN" });
        }
        if (!orderid || !status || !username) {
            return res.status(400).json({ message: "missing fields" });
        }
        const order = yield OrderModel_1.default.findOne({ _id: orderid });
        if (!order) {
            return res.status(404).json({ message: "order not found" });
        }
        const user = yield UserModels_1.default.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        const newbalance = user.balance - amount;
        if (newbalance < 0) {
            return res.status(400).json({ message: "insufficient funds" });
        }
        order.balance = newbalance;
        order.status = status;
        order.save();
        return res.status(200).json({ message: "success" });
    }
    catch (error) {
        return res.status(500).json({ message: "internal server error" });
    }
});
exports.updateOrder = updateOrder;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) { }
});
exports.deleteOrder = deleteOrder;
const getAllorders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.status(403).json({ message: "you are not logged" });
        }
        const orders = yield OrderModel_1.default.find().populate('user', '-password').populate('order_category_id');
        return res.status(200).json(orders);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
});
exports.getAllorders = getAllorders;
const getSingleOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderid } = req.params;
        const order = yield OrderModel_1.default.findOne({ _id: orderid });
        if (!order) {
            return res.status(404).json({ message: "order not found" });
        }
        return res.status(200).json({ order });
    }
    catch (error) { }
});
exports.getSingleOrder = getSingleOrder;
const getUserOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userid } = req.body;
        const order = yield OrderModel_1.default.find({ user: userid }).populate("order_category_id");
        if (!order) {
            return res.status(404).json({ message: "order not found" });
        }
        return res.status(200).json(order);
    }
    catch (error) { }
});
exports.getUserOrder = getUserOrder;
