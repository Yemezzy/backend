import express from "express";
const router = express.Router();
import { authenticateUser } from "../middlewares/authenticateUser";
import {
  getOrderCategory,
  createOrderCategory,
  deleteOrderCategory,
  updateOrderCategory,
  getOrderCategories,
} from "../controllers/orders/orderCategory";
import { authenticateAdmin } from "../middlewares/authenticateAdmin";
import {
  createOrder,
  updateOrder,
  getAllorders,
  getSingleOrder,
  deleteOrder,
  getUserOrder,
} from "../controllers/orders/orders";
router.get("/", authenticateUser, authenticateAdmin, getOrderCategories);
router.post(
  "/create-order-category",
  authenticateUser,
  authenticateAdmin,
  createOrderCategory
);
router.get(
  "/category/:orderid",
  authenticateUser,
  authenticateAdmin,
  getOrderCategory
);
router.patch(
  "/category/:orderid",
  authenticateUser,
  authenticateAdmin,
  updateOrderCategory
);
router.delete(
  "/category/:orderid",
  authenticateUser,
  authenticateAdmin,
  deleteOrderCategory
);
router.post(
  "/order/user",
  authenticateUser,
  authenticateAdmin,
  getUserOrder
);

// orders

router.post("/create-order", authenticateUser, createOrder);
router.put("/update-order", authenticateUser, updateOrder);
router.get("/all", authenticateUser, getAllorders);
router.get("/single/:orderid", authenticateUser, getSingleOrder);
router.delete("/single/:orderid", authenticateUser, deleteOrder);

export default router;
