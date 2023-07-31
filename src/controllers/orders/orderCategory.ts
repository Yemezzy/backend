import mongoose from "mongoose";
import OrderCategoryModel from "../../models/OrderListing/category/OrderCategoryModel";
import dotenv from "dotenv";

import { object, z } from "zod";
const schema = z.object({
  title: z.string(),
  // services:z.array({})
});
import { Request, Response } from "express";
import UserModel from "../../models/User/UserModels";
import { log } from "console";
dotenv.config();
interface IGetUserAuthInfoRequest extends Request {
  user: any;
  isAdmin: true;
}
const createOrderCategory = async (
  req: IGetUserAuthInfoRequest | any,
  res: Response
) => {
  try {
    if (!req.isAdmin) {
      return res.status(403).json({ message: "you are not authorised" });
    }
    console.log(req.user);
    const UserInDb = await UserModel.findOne({ username: req.user });

    const { title, services } = req.body;


    if (!title || services.length < 1) {
      return res.status(400).json({ message: "missing fields" });
    }

    const categoryInDb = await OrderCategoryModel.findOne({ title });
console.log(categoryInDb);

    if (categoryInDb) {
      return res.status(400).json({ message: "category exists" });
    }

    const newCategory = new OrderCategoryModel({
      title,
      user: UserInDb?._id,
      services,
    });

    newCategory.save();
    return res.status(200).json({ message: "order category created" });
  } catch (error) {
    //  console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
  
};

const updateOrderCategory = async (
  req: IGetUserAuthInfoRequest | any,
  res: Response
) => {
  try {
    if (!req.isAdmin) {
      return res.status(403).json({ message: "you are not authorised" });
    }

    const { orderid } = req.params;
    if (!orderid) {
      res.status(404).json({ message: "not found" });
    }

    const orderCategory: any = await OrderCategoryModel.findOne({
      order_id: orderid,
    });

    if (!orderCategory) {
      return res.status(404).json({ message: "order category not found" });
    }

    const {
      title,
      order_id,
      order_services,
      price_per_1000,
      min_amount,
      max_amount,
      description,
    } = req.body;

    if (
      !title ||
      !order_id ||
      !order_services ||
      !min_amount ||
      !max_amount ||
      !price_per_1000
    ) {
      return res.status(400).json({ message: "missing field" });
    }

    if (
      !schema.safeParse({
        title,
        order_id,
        order_services,
        min_amount,
        max_amount,
        price_per_1000,
      }).success
    ) {
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
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

const getOrderCategories = async (
  req: IGetUserAuthInfoRequest | any,
  res: Response
) => {
  try {
    if (!req.isAdmin) {
      return res.status(403).json({ message: "you are not authorised" });
    }
    const categories = await OrderCategoryModel.find();
    res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

const getOrderCategory = async (
  req: IGetUserAuthInfoRequest | any,
  res: Response
) => {
  try {
    if (!req.isAdmin) {
      return res.status(403).json({ message: "you are not authorised" });
    }

    const { orderid } = req.params;
    if (!orderid) {
      res.status(404).json({ message: "not found" });
    }

    const orderCategory = await OrderCategoryModel.findOne({
      _id: orderid,
    });

    if (!orderCategory) {
      return res.status(404).json({ message: "order category not found" });
    }
    return res.status(200).json(orderCategory);
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};
const deleteOrderCategory = async (
  req: IGetUserAuthInfoRequest | any,
  res: Response
) => {
  try {
    if (!req.isAdmin) {
      return res.status(403).json({ message: "you are not authorised" });
    }

    const { orderid } = req.params;
    if (!orderid) {
      res.status(404).json({ message: "not found" });
    }

    const orderCategory = await OrderCategoryModel.deleteOne({
      _id: orderid,
    });
    return res.status(200).json({ message: "order category deleted" });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

export {
  createOrderCategory,
  updateOrderCategory,
  getOrderCategories,
  getOrderCategory,
  deleteOrderCategory,
};
