const express = require("express");

const {getAllStudentViewCoursesController, getStudentViewCourseDetailsController, checkCoursePurchaseInfoController}= require("../../controllers/studentController/courseController");
const authenticate = require("../../middleware/authMiddleware");

const router = express.Router();

router.get("/get",authenticate, getAllStudentViewCoursesController);
router.get("/get/details/:id", authenticate,getStudentViewCourseDetailsController);
router.get("/purchase-info/:id/:studentId",authenticate,checkCoursePurchaseInfoController );



module.exports=router