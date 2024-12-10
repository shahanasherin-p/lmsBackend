const express = require("express");
const { addNewCourseController, getAllCoursesController, getCourseDetailsByIDController, updateCourseByIDController, deleteCourseController } = require("../../controllers/instructorController");
const authMiddleware=require('../../middleware/authMiddleware')

const router = express.Router();

router.post("/add", addNewCourseController);
router.get("/get",authMiddleware, getAllCoursesController);
router.get("/get/details/:id", getCourseDetailsByIDController);
router.put("/update/:id", updateCourseByIDController);
router.delete('/:courseId', deleteCourseController);

module.exports = router;