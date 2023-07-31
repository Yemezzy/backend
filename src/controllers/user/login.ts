import { Request, Response } from "express";
import UserModel from "../../models/User/UserModels";
import dotenv from 'dotenv'

import bcrypt from 'bcrypt'
dotenv.config()
import jwt, { Secret } from 'jsonwebtoken'

const access_secret = process.env.USER_ACCESS_TOKEN_SECRET as Secret
const login = async(req:Request, res:Response)=>{
try {
    const {username, password} = req.body

    if(!username || !password) {
        return res.status(400).json({message: 'missing fields'})
    }

    const user:any =  await UserModel.findOne({$or:[{username}, {email:username}]}) 

    if(!user){
        return res.status(404).json({message: 'user not found'})
    }
console.log(access_secret)
    if(!bcrypt.compareSync(password, user.password)){
return res.status(400).json({message: "invalid login details"})
    }
    
    const access_token =  jwt.sign({user: user.username}, access_secret)

    res.cookie('_access_token_', access_token, {path:"/", sameSite:"lax", maxAge:1000*60*60*8})
return res.status(200).json({message:"login success"})    

} catch (error) {
    console.log(error)
}
}





export {login}