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
exports.deleteOrderCategory = exports.getOrderCategory = exports.getOrderCategories = exports.updateOrderCategory = exports.createOrderCategory = void 0;
const OrderCategoryModel_1 = __importDefault(require("../../models/OrderListing/category/OrderCategoryModel"));
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
const schema = zod_1.z.object({
    title: zod_1.z.string(),
    // services:z.array({})
});
const UserModels_1 = __importDefault(require("../../models/User/UserModels"));
dotenv_1.default.config();
const createOrderCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.isAdmin) {
            return res.status(403).json({ message: "you are not authorised" });
        }
        console.log(req.user);
        const UserInDb = yield UserModels_1.default.findOne({ username: req.user });
        const { title, services } = req.body;
        if (!title || services.length < 1) {
            return res.status(400).json({ message: "missing fields" });
        }
        const categoryInDb = yield OrderCategoryModel_1.default.findOne({ title });
        console.log(categoryInDb);
        if (categoryInDb) {
            return res.status(400).json({ message: "category exists" });
        }
        const newCategory = new OrderCategoryModel_1.default({
            title,
            user: UserInDb === null || UserInDb === void 0 ? void 0 : UserInDb._id,
            services,
        });
        newCategory.save();
        return res.status(200).json({ message: "order category created" });
    }
    catch (error) {
        //  console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
});
exports.createOrderCategory = createOrderCategory;
const updateOrderCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.isAdmin) {
            return res.status(403).json({ message: "you are not authorised" });
        }
        const { orderid } = req.params;
        if (!orderid) {
            res.status(404).json({ message: "not found" });
        }
        const orderCategory = yield OrderCategoryModel_1.default.findOne({
            order_id: orderid,
        });
        if (!orderCategory) {
            return res.status(404).json({ message: "order category not found" });
        }
        const { title, order_id, order_services, price_per_1000, min_amount, max_amount, description, } = req.body;
        if (!title ||
            !order_id ||
            !order_services ||
            !min_amount ||
            !max_amount ||
            !price_per_1000) {
            return res.status(400).json({ message: "missing field" });
        }
        if (!schema.safeParse({
            title,
            order_id,
            order_services,
            min_amount,
            max_amount,
            price_per_1000,
        }).success) {
            return res.status(400).json({ message: "invalid entry types" });
        }
        orderCategory.title = title;
        orderCategory.order_services = order_services;
        orderCategory.max_amount = max_amount;
        orderCategory.min_amount = min_amount;
        orderCategory.price_per_1000 = price_per_1000;
        orderCategory.description = description;
        orderCategory.save();
        return res.status(203).json({ message: "order category updated" });
    }
    catch (error) {
        return res.status(500).json({ message: "internal server error" });
    }
});
exports.updateOrderCategory = updateOrderCategory;
const getOrderCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.isAdmin) {
            return res.status(403).json({ message: "you are not authorised" });
        }
        const categories = yield OrderCategoryModel_1.default.find();
        res.status(200).json(categories);
    }
    catch (error) {
        return res.status(500).json({ message: "internal server error" });
    }
});
exports.getOrderCategories = getOrderCategories;
const getOrderCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.isAdmin) {
            return res.status(403).json({ message: "you are not authorised" });
        }
        const { orderid } = req.params;
        if (!orderid) {
            res.status(404).json({ message: "not found" });
        }
        const orderCategory = yield OrderCategoryModel_1.default.findOne({
            _id: orderid,
        });
        if (!orderCategory) {
            return res.status(404).json({ message: "order category not found" });
        }
        return res.status(200).json(orderCategory);
    }
    catch (error) {
        return res.status(500).json({ message: "internal server error" });
    }
});
exports.getOrderCategory = getOrderCategory;
const deleteOrderCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.isAdmin) {
            return res.status(403).json({ message: "you are not authorised" });
        }
        const { orderid } = req.params;
        if (!orderid) {
            res.status(404).json({ message: "not found" });
        }
        const orderCategory = yield OrderCategoryModel_1.default.deleteOne({
            _id: orderid,
        });
        return res.status(200).json({ message: "order category deleted" });
    }
    catch (error) {
        return res.status(500).json({ message: "internal server error" });
    }
});
exports.deleteOrderCategory = deleteOrderCategory;
