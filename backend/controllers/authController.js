const User = require("../models/userModel");

const register = async(req,res) =>{
    const {email} = req.body;
    const user = await User.findOne({email});

    if(user){

       return res.status(400).json({message:"Please Use Unique Email/User with Email Already Exists"});
    }
    try {
        const newUser = await User.create(req.body);
        console.log(newUser);
        return res.status(200).json({message:"User Created Successfully"});
    } catch (error) {

       return res.status(400).json({message:error.message});
    }
}


const login = async(req,res) =>{
    const {email,password} = req.body; 
    const user = await User.findOne({email});

    if (!user){
        return res.status(200).json({message:"User not Found"});
    }

    const validPassword = await user.comparePassword(password);

    if(!validPassword){
        return res.status(400).json({message:"Invalid Credentails"});
    }

    sendToken(user,200,res);
    // return res.status(200).json({message:"Login Success"});
}

const sendToken = async(user,codeStatus,res) =>{
    const token = await user.getJwtToken();
    console.log("user:",user);
    res
    .status(codeStatus)
    .cookie('token',token,{maxAge: 60*60*1000, httpOnly:true})
    .json({success:true,token,user})

}

const logout = (req,res,next)=>{
    res.clearCookie('token');
    return res.status(200).json({status:true,message:"Logout Success"});
}

const userProfile = async(req,res,next) =>{
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({
        success:true,
        user
    })
}


// SIngle User

const singleUser = async(req,res) =>{
    try {
        const user = await User.findById(req.params.id);
        if (!user){
        return res.status(400).json({success:false,message:"User Not Found with the Provided ID"});
        }
        return res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        return res.status(400).json({success:false,message:error.message});
    }
}


const updateUser = async(req,res)=>{
    try {
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
        return res.status(200).json({
            success:true,
            user
        })

    } catch (error) {
        return res.status(400).json({success:false,message:error.message});
    }
}

const deleteUser = async(req,res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(400).json({success:true,message:"User Not Found"});

        }
        return res.status(200).json({success:true,message:"User Deleted Successfully"});

    } catch (error) {
        return res.status(400).json({success:false,message:error.message});
    }
}





module.exports ={
    register,login,logout,userProfile,singleUser,updateUser,deleteUser
}