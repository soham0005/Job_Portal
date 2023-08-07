const express = require("express");
const router = express.Router();
const {allUsers} = require("../controllers/userController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const { singleUser, updateUser,deleteUser } = require("../controllers/authController");



router.get('/allusers',isAuthenticated,allUsers);
router.get('/user/:id',isAuthenticated,singleUser);
router.put('/user/edit/:id',isAuthenticated,updateUser);
router.delete('/user/delete/:id',isAuthenticated,deleteUser);  

router.delete('/admin/user/delete/:id',isAuthenticated,isAdmin,deleteUser);  





module.exports = router;