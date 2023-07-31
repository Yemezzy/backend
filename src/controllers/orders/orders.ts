import OrderModel from "../../models/Orders/OrderModel";
import { Response, Request } from "express";
import { z } from "zod";
import OrderCategoryModel from "../../models/OrderListing/category/OrderCategoryModel";
import UserModel from "../../models/User/UserModels";
import { log } from "console";
interface IGetUserAuthInfoRequest extends Request {
  user: any;
}

const schema = z.object({
  order_category_id: z.string(),
  charge: z.number(),
  
  link: z.string().url(),
});
const createOrder = async (
  req: IGetUserAuthInfoRequest | any,
  res: Response
) => {
  try {
    
    if (!req.user) {
      
      return res.status(400).json({ message: "you are not logged in" });
    }

    const { link, order_id, charge } = req.body;

    if (!link || !order_id || !charge) {
      return res.status(400).json({ message: "some fields are missing" });
    }

    if (!schema.safeParse({ link, order_category_id:order_id, charge }).success) {
      return res.status(400).json({ message: "invalid entry types " });
    }

    const order: any = await OrderCategoryModel.findOne({ _id: order_id });
    if (!order) {
      return res.status(404).json({ message: "order category not  found" });
    }
    const user: any = await UserModel.findOne({ username: req.user });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const newbalance = user.balance - charge;
    if (newbalance < 0) {
       return res.status(400).json({ message: "insufficent balance" });
    }
    user.balance = newbalance

    const newOrder = new OrderModel({
      user: user._id,
      order_category_id: order._id,
      link,
      charge
    
    });
    user.save()
    newOrder.save();
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

const updateOrder = async (
  req: IGetUserAuthInfoRequest | any,
  res: Response
) => {
  try {
    const { orderid, status, username, amount } = req.body;
    if (!req.isAdmin) {
      return res.status(403).json({ message: "you are not authorised" });
    }

    if (!orderid || !status || !username) {
      return res.status(400).json({ message: "missing fields" });
    }

    const order: any = await OrderModel.findOne({ _id: orderid });
    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }

    const user = await UserModel.findOne({ username });

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
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

const deleteOrder = async (
  req: IGetUserAuthInfoRequest | any,
  res: Response
) => {
  try {
  } catch (error) {}
};

const getAllorders = async (
  req: IGetUserAuthInfoRequest | any,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(403).json({ message: "you are not authorised" });
    }

    const orders = await OrderModel.find().populate('user', '-password').populate('order_category_id');
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "internal server error" });
  }
};

const getSingleOrder = async (
  req: IGetUserAuthInfoRequest | any,
  res: Response
) => {
  try {
    const { orderid } = req.params;

    const order: any = await OrderModel.findOne({ _id: orderid });
    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }

    return res.status(200).json({ order });
  } catch (error) {}
};

const getUserOrder = async (
  req: IGetUserAuthInfoRequest | any,
  res: Response
) => {
  try {
    const { userid } = req.body;

    const order: any = await OrderModel.find({ user: userid }).populate(
      "order_category_id"
    );
    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }

    return res.status(200).json(order );
  } catch (error) {}
};

export { createOrder, updateOrder, deleteOrder, getAllorders, getSingleOrder, getUserOrder };
