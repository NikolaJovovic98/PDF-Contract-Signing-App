import User from "../models/Users.js";
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export const check_admin = async (req,res,next) =>{
    try {
       const cookie = req.cookies.profile || false;
       if(!cookie) return res.status(401).json({msg:"Not allowed"});

       const jwt_token = jwt.verify(cookie,process.env.JWT_SECRET);
       const user_id = jwt_token.user_id;
       if(!mongoose.Types.ObjectId.isValid(user_id)) return res.status(401).json({msg:"Not allowed"});

       const user = await User.findById(user_id);
       if(!user.is_admin) return res.status(401).json({msg:"Not allowed"});

       req.user = user_id;
       next();
    } catch (error) {
         console.log("Error in admin check middleware ",error);
         res.status(401).json({msg:error})
    };
};
