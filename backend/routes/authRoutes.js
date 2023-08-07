const express = require("express");
const router = express.Router();
const {register, login, logout, userProfile} = require("../controllers/authController");
const { isAuthenticated } = require("../middleware/auth");




router.get('/',(req,res)=>{
    res.json({message:"Default Router"});
})

router.post('/register',register);
router.post('/login',login);
router.get('/logout',logout);
router.get('/user',isAuthenticated,userProfile);






module.exports = router;
