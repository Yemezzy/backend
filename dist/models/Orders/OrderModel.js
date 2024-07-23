"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const OrderSchma = new Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    order_category_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Order_Category",
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    charge: {
        type: Number,
        required: true,
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Number,
        default: Date.now(),
    },
    status: {
        type: String,
        enum: ["completed", "processing", "cancelled"],
        default: "processing",
    },
}, {
    timestamps: true,
});
const OrderModel = mongoose_1.default.model("Orders", OrderSchma);
exports.default = OrderModel;
