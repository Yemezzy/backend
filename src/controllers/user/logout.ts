const express = require("express");
const app = express();
import { Request, Response } from "express";
import { json } from "node:stream/consumers";
const cookie = require("cookie-parser");
app.use(express.json());
app.use(cookie());

const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("_access_token_");
    res.cookie("_access_token_", "", {
      httpOnly: true,
      maxAge: 0,
    });
      return res.status(200).json({ message: "error 200" });
  } catch (error) {
    console.log(error);
  }
};

export { logout };
