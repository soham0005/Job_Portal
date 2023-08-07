const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
require("dotenv").config();

const userSchema = new mongoose.Schema({
    firstName :{
        type:String,
        required:[true,"first name is required"],
        trim:true,
    },
    lastName :{
        type:String,
        required:[true,"last name is required"],
        trim:true,
    },
    email:{
        type:String,
        trim:true,
        required:[true,"email is required"],
        unique:true,
    },
    password:{
        type:String,
        trim:true,
        required:[true,"email is required"],
    },
    role:{
        type:Number,
        default:0
    }
},{timestamps:true});

userSchema.pre("save", async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}


userSchema.methods.getJwtToken = async function(){
    return jwt.sign({id:this.id},process.env.JWT_SECRET,{
        expiresIn:3600
    });
}






module.exports = mongoose.model("User",userSchema);