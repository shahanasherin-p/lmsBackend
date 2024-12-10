const express = require("express");

const { getCoursesByStudentIdController } = require("../../controllers/studentController/studentCourseController");

const router = express.Router();

router.get("/get/:studentId", getCoursesByStudentIdController);

module.exports = router;
