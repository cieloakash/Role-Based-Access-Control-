import bcrypt from "bcryptjs";
import User from "../models/user.js";
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    res.status(200).json({ sucess: true, message: "new user Registered" });
  } catch (error) {
    res.status(500).json({ sucess: false, message: error.message });
  }
};


export const login = async (req, res) => {
    try {
        const {username,password}=req.body
        const user =await User.findOne({username})
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
              });
        }
        const compare_password = await bcrypt.compare(password,user.password)
        if(!compare_password){
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
              });
        }

        const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{
            expiresIn:"1h"
        })
        
        res.status(200).json({token})
    } catch (error) {
         res.status(500).json({ sucess: false, message: error.message });
    }
};
