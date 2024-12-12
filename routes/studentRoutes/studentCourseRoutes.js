const express = require("express");

const { getCoursesByStudentIdController } = require("../../controllers/studentController/studentCourseController");
const authenticate = require("../../middleware/authMiddleware");

const router = express.Router();

router.get("/get/:studentId",authenticate, getCoursesByStudentIdController);

module.exports = router;
