const express = require("express");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const { createJobType, allJobsType,updateJobType,deleteJobType } = require("../controllers/jobTypeController");
const router = express.Router();

//job type routes

// /api/type/create
router.post('/type/create', isAuthenticated, isAdmin, createJobType)

router.get('/type/jobs', allJobsType)
// /api/type/update/type_id
router.put('/type/update/:type_id', isAuthenticated, isAdmin, updateJobType)
// /api/type/delete/type_id
router.delete('/type/delete/:type_id', isAuthenticated, isAdmin, deleteJobType)








module.exports = router;