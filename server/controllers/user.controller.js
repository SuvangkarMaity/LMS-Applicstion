import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

//register
export const register = async(req, res)=> {
    try{
     const {name, email, password, role} = req.body
     if(!name || !email || !password || !role){
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
     }
     const user = await User.findOne({email})
     if(user){
        return res.status(400).json({
            success:false,
            message:"User already exists with this email"
        })
     }

     const hashedPassword = await bcrypt.hash(password, 10) 
     await User.create({
        name,
        email,
        password:hashedPassword,
        role
     });
     return res.status(201).json({
        success:true,
        message:"Account Created Successfully"
     })
        
    } catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Faild to registered"
        })
    }
}

//login
export const login = async(req, res)=> {
 try{
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        })
    }
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({
            success:false,
            message:"Incorrect email or password"
        })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if(!isPasswordMatch){
        return res.status(400).json({
            succcess:false,
            message:"Incorrect email or password"
        })
    }
    //generate token 
    const token = jwt.sign({userId:user._id}, process.env.SECRET_KEY, {expiresIn:"1d"})
    return res.cookie('token', token, {httpOnly:true, sameSite:'strict', maxAge:1*24*60*60*1000}).json({
      message:`Welcome back ${user.name}`,
      success:true,
      user  
    })

 }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Faild to login"
        })
    }
}

export const logout = async(__, res)=>{
    try{
        return res.status(200).cookie("token", "", {maxAge:0}).json({
           message:"Logged out Successfully",
           success:true
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Faild to logout"
        })
    }
}
export const updateProfile = async(req, res) =>{
    try{
        const userId = req.id
        const {name, description} = req.body;
        const file = req.file;

        const fileUri = getDataUri(file)
        let cloudResponse = await cloudinary.uploader.upload(fileUri)
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({
                message: "User not found",
                success:false
            })
        }

        //updateing data, if user available
        if(name) user.name = name
        if(description) user.description = description
        if(file) user.photourl = cloudResponse.secure_url

        await user.save()
        return res.status(200).json({
           message: "Profile updated successfully",
           success: true,
           user
        })

    }catch(error){
       console.log(error);
        return res.status(500).json({
            success:false,
            message:"Faild to update profile" 
    })
  }
}