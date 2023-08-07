const User = require("../models/userModel");
const { isAuthenticated } = require("../middleware/auth");



const allUsers = async(req,res,next) =>{

    //Pagination
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await User.find({}).estimatedDocumentCount();

    try {
        const users = await User.find().sort({ createdAt: -1 }).select('-password')
            .skip(pageSize * (page - 1))
            .limit(pageSize)

        res.status(200).json({
            success: true,
            users,
            page,
            pages: Math.ceil(count / pageSize),
            count

        })
        next();
    } catch (error) {
       return res.status(400).json({message:error.message}); 
    }
    

}

module.exports ={
    allUsers,
}