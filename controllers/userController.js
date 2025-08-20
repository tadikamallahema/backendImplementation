import { registerUser, loginUser } from "../services/userServices.js";

export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ success: true, message:"User registered successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { token, user } = await loginUser(req.body);
    res.cookie('token',token ,{
            httpOnly:true ,
            secure: process.env.NODE_ENV==='production',
            sameSite :process.env.NODE_ENV==='production'?'none':'strict',
            maxAge:1*24*60*60*1000
    });
        res.status(201).json({success:"true",token, user:{
            id:user.uId,
            name:user.name,
            email:user.email,
            role:user.role
        }})
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
