const express = require("express");
const { addNewCourseController, getAllCoursesController, getCourseDetailsByIDController, updateCourseByIDController, deleteCourseController } = require("../../controllers/instructorController");
const authenticate = require("../../middleware/authMiddleware");

const router = express.Router();

router.post("/add",authenticate, addNewCourseController);
router.get("/get",authenticate, getAllCoursesController);
router.get("/get/details/:id",authenticate, getCourseDetailsByIDController);
router.put("/update/:id",authenticate, updateCourseByIDController);
router.delete('/:courseId',authenticate, deleteCourseController);

module.exports = router;