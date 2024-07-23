"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authenticateUser_1 = require("../middlewares/authenticateUser");
const orderCategory_1 = require("../controllers/orders/orderCategory");
const authenticateAdmin_1 = require("../middlewares/authenticateAdmin");
const orders_1 = require("../controllers/orders/orders");
router.get("/", authenticateUser_1.authenticateUser, authenticateAdmin_1.authenticateAdmin, orderCategory_1.getOrderCategories);
router.post("/create-order-category", authenticateUser_1.authenticateUser, authenticateAdmin_1.authenticateAdmin, orderCategory_1.createOrderCategory);
router.get("/category/:orderid", authenticateUser_1.authenticateUser, authenticateAdmin_1.authenticateAdmin, orderCategory_1.getOrderCategory);
router.patch("/category/:orderid", authenticateUser_1.authenticateUser, authenticateAdmin_1.authenticateAdmin, orderCategory_1.updateOrderCategory);
router.delete("/category/:orderid", authenticateUser_1.authenticateUser, authenticateAdmin_1.authenticateAdmin, orderCategory_1.deleteOrderCategory);
router.post("/order/user", authenticateUser_1.authenticateUser, authenticateAdmin_1.authenticateAdmin, orders_1.getUserOrder);
// orders
router.post("/create-order", authenticateUser_1.authenticateUser, orders_1.createOrder);
router.put("/update-order", authenticateUser_1.authenticateUser, orders_1.updateOrder);
router.get("/all", authenticateUser_1.authenticateUser, orders_1.getAllorders);
router.get("/single/:orderid", authenticateUser_1.authenticateUser, orders_1.getSingleOrder);
router.delete("/single/:orderid", authenticateUser_1.authenticateUser, orders_1.deleteOrder);
exports.default = router;
