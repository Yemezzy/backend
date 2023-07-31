import { Request, Response } from "express";
import{z, ZodError} from 'zod'
import bycrypt from 'bcrypt'
import {schema, requiredinput} from '../../utils/inputSchema'

import UserModel from "../../models/User/UserModels";
const register = async (req:Request, res:Response)=>{
try {
 

if(!schema.safeParse(req.body).success){
    return res.status(400).json({message: 'some fields are missing'})
}
    const {firstname, lastname, username, email, password, confirm_password } = req.body

    if(!z.string().email().safeParse(email).success){
        return res.status(400).json({message: 'please enter a valid email address'})
    }


    if(!z.string().min(8).safeParse(password).success){
        return res.status(400).json({message: 'passwords must be atleast 8 character length'})
    }

    if(password !== confirm_password){
        return res.status(400).json({message:"passwords do not match"})
    } 
    const existing_user =  await UserModel.findOne({$or:[{email}, {username}]})
    
    if(existing_user){
        return res.status(400).json({message:"user exists"})
    }
    const salt = bycrypt.genSaltSync(10)
    
    const hashedPassword = bycrypt.hashSync(password, salt)

    const new_user = new UserModel({
firstname,
lastname,
username,
email,
password:hashedPassword 
    }) 
    new_user.save()
return res.status(200).json({message: "user created"})
} catch (error:unknown) {
console.log(error)
  
} 
}

export  {register}