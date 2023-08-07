const jwt = require('jsonwebtoken');
const User = require("../models/userModel");


const isAuthenticated = async(req,res,next) =>{
    const {token} = req.cookies;

    if(!token){
        return res.status(401).json({message:"Not Authorized! Please Login!!"});
        // return res.redirect("/login")   
    }
    try {

        const decoded =  jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
        
    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}

const isAdmin = async (req,res,next) =>{
    if(req.user.role == 0){
        return res.status(400).json({message:"Access Denied, You're not Admin"});
    }
    next();
}

module.exports = {
    isAuthenticated,isAdmin
}