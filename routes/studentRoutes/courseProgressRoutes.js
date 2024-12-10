const express = require("express");
const { getCurrentCourseProgressController, markCurrentLectureAsViewedController, resetCurrentCourseProgressController } = require("../../controllers/studentController/courseProgressController");


const router = express.Router();

router.get("/get/:userId/:courseId", getCurrentCourseProgressController);
router.post("/mark-lecture-viewed", markCurrentLectureAsViewedController);
router.post("/reset-progress", resetCurrentCourseProgressController);


module.exports = router;
