const express = require("express");

const {getAllStudentViewCoursesController, getStudentViewCourseDetailsController, checkCoursePurchaseInfoController}= require("../../controllers/studentController/courseController");
const authenticate = require("../../middleware/authMiddleware");

const router = express.Router();

router.get("/get", getAllStudentViewCoursesController);
router.get("/get/details/:id", getStudentViewCourseDetailsController);
router.get("/purchase-info/:id/:studentId",authenticate,checkCoursePurchaseInfoController );



module.exports=router