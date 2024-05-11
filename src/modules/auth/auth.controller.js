import UserModel from "../../Model/User.Model.js";
import bcrypt from'bcryptjs';
import jwt from 'jsonwebtoken';
import { SendEmail } from "../../../utls/SendEmail.js";
import { customAlphabet, nanoid } from 'nanoid';

export const SignUp = async (req,res)=>{
    const {UserName,Email,Password} = req.body;

    const user = await UserModel.findOne({Email});

    if(user){
        return res.status(409).json({message:" email already exists"});

    }

    const HashedPassword = bcrypt.hashSync(Password,parseInt(process.env.SALTROUND));
     
    const CreateUser = await UserModel.create({UserName,Email,Password:HashedPassword});
    
    await SendEmail(Email,`Welcom`,`<h2>hello ${UserName}</h2>`)
    return res.status(201).json({message:" success",user:CreateUser});

}


export const SignIn = async (req,res)=>{
    const {Email,Password} = req.body;

    const user = await UserModel.findOne({Email});

    if(!user){
        return res.status(400).json({message:" Invalid data"});

    }
        
    const Match = bcrypt.compare(Password,user.Password);
     

    if(user.Status == "Not Active"){
        return res.status(400).json({message:" The account is blocked"});

    }

    if(!Match){
        return res.status(400).json({message:" Invalid data"});

    }

    const Token = jwt.sign({id:user._id,role:user.Role},process.env.LOGINSIG);
    return res.status(200).json({message:" success",Token});

}


export const SendCode = async(req,res)=>{
    const {Email} = req.body;
    const code = customAlphabet('1234567890abcdef', 4)()
    const user = await UserModel.findOneAndUpdate({Email},{SendCode:code},{new:true});

    if(!user){
        return res.status(400).json({message:" email not found"});
    }
    
    //await SendEmail(Email,`Reset Password`,`<h2> code is ${code}</h2>`)
    
    return res.status(200).json({message:" success",user});

     }
    
  