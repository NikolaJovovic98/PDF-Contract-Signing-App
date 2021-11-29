import User from "../models/Users.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import fs from 'fs';
import { Duplex } from 'stream';

export const admin_add_new_user = async (req, res) => {
    const { email, password } = req.body;
    try {

        if( !validateEmail(email) || toString(password).length < 6 ) return res.status(400).json({msg:'Not able to add new user 1'});

        const crypted_password = await bcrypt.hash(toString(password),10);

        const user_exists = await User.findOne({ email });

        const all_users = await User.find({});
        if( user_exists ) return res.status(400).json({error:"Email zauzet",data:all_users});

        await User.create({
            email,
            password : crypted_password
        });

        const all_users_final = await User.find({});

        return res.status(200).json(all_users_final);

    } catch (error) {
        console.log('Error in adding new user: ', error.message);
        return res.status(400).json({ msg: 'Not able to add new user 2'});
    }
};

export const admin_remove_user = async (req,res) => {
    const { id } = req.params;
    try {

        if(!mongoose.isValidObjectId(id)) return res.status(400).json({msg:'Not able to remove user'});
        
        const user = await User.findOne({ _id : id });

        const users = await User.find({});
        if( user.is_admin ) return res.status(400).json({error:'Not able to remove user',data:users});

        await User.deleteOne({ _id : id });

        const users_final = await User.find({});
        return res.status(200).json(users_final);

    } catch (error) {
        console.log('Not able to remove user: ',error.message);
        return res.status(400).json({msg:'Not able to remove user'})
    }
};

export const login = async (req,res) => {

    const { email, password } = req.body;

    try {
        if( !validateEmail(email) || toString(password).length < 6 ) return res.status(400).json({msg:"Invalid Data"});

        const user = await User.findOne({ email }).select('+password');
        if(!user) return res.status(400).json({msg:"No such user"});

        const check_password = await bcrypt.compare(toString(password),user.password);
    
        if(!check_password) return res.status(400).json({msg:"Wrong email or password"});

        const jwt_token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, { expiresIn: "2h" });

        res.cookie('profile', jwt_token, {
            secure: false,
            httpOnly: true
        });

        return res.status(201).json(
            {
                id: user._id,
                email : user.email,
                is_admin: user.is_admin,
            });

    } catch (error) {
        console.log('Error in login : ', error.message);
        return res.status(400).json({ msg: 'Not able to login'});
    }
};

export const check_cookie = async (req, res) => {
    try {
        const cookie = req.cookies.profile || false;
        if(!cookie) throw new Error('no cookie');
        const digest_cookie = jwt.verify(cookie, process.env.JWT_SECRET);
        const user = await User.findById(digest_cookie.user_id);
        if (!user) throw new Error('jwt malformed');
        return res.json(true);
    } catch (error) {
        if (error.message === 'jwt malformed' || error.message === 'jwt expired' || error.message === 'no cookie') {
            res.clearCookie("profile");
            return res.json(false);
        }
    }
};

export const logout = async (req,res) => {
    try {
        res.clearCookie("profile");
        return res.status(200).json(false);
    } catch (error) {
        console.log('Error in logging out: ',error.message);
        return res.json(false);
    };
};

export const get_users = async (req,res) => {
    try {
        const users = await User.find({});
        return res.status(200).json(users);
    } catch (error) {
        console.log('Error in getting users out: ',error.message);
        return res.status(400).json({msg:"Error in getting users"});
    };
};


const bufferToStream = (myBuffer) => {
    let tmp = new Duplex();
    tmp.push(myBuffer);
    tmp.push(null);
    return tmp;
};

export const uploadPdf =  async ( req,res)=>{
    const userId = req.user;
    const __dirname = res.locals.__dirname;
    const { file } = req;
    console.log(req.body.email);
    try {
        
        if( file.mimetype !== 'application/pdf' ) console.log(' FILE MUST BE PDF ');

        const fileName = userId + '.pdf';
        const down_path = __dirname + '/documents/' + fileName;

        const readStream = bufferToStream(file.buffer);

        const writeStream = fs.createWriteStream(down_path);
        
        readStream.pipe(writeStream);
        
    } catch (error) {
        console.log('Error in uploading pdf file: ',error.message);
        return res.status(400).json({msg:'Error in uploading pdf file'});
    }
};


const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}