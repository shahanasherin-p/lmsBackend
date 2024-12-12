const mongoose = require("mongoose");

const StudentCoursesSchema = new mongoose.Schema({
  userId: {
  type:String,
  required:true
},
  courses: [
    {
      courseId: {
        type:String,
        required:true
    
      },
      title: String,
      instructorId: String,
      instructorName: String,
      dateOfPurchase: Date,
      courseImage: String,
    },
  ],
});

module.exports = mongoose.model("StudentCourses", StudentCoursesSchema);
