require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./database/dbConnection');

const authRoutes = require('./routes/AuthRoutes');
const mediaRoutes = require('./routes/instructorRoutes/mediaRoutes');
const instructorCourseRoutes = require("./routes/instructorRoutes/courseRoutes");
const studentCourseRoutes = require("./routes/studentRoutes/studentCourseRoutes");
const studentViewOrdereRoutes = require("./routes/studentRoutes/orderRoutes");
const studentViewCourseRoutes = require("./routes/studentRoutes/courseRoutes");
const studentCourseProgressRoutes = require("./routes/studentRoutes/courseProgressRoutes");


const LearningManagementServer = express();
const PORT=3000 || process.env.PORT

LearningManagementServer.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

LearningManagementServer.use(express.json());





LearningManagementServer.use('/auth', authRoutes);
LearningManagementServer.use('/media', mediaRoutes);
LearningManagementServer.use('/instructor/course', instructorCourseRoutes);
LearningManagementServer.use('/student/course', studentViewCourseRoutes);
LearningManagementServer.use('/student/order', studentViewOrdereRoutes);
LearningManagementServer.use('/student/courses-bought', studentCourseRoutes);
LearningManagementServer.use('/student/course-progress', studentCourseProgressRoutes);









LearningManagementServer.listen(PORT, () => {
  console.log(`LearningManagementServer STARTED AT PORT ${PORT} AND WAITING FOR CLIENT REQUEST`);
});
