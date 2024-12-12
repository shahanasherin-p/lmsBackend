const Course = require("../models/courseModel");


// exports.addNewCourseController = async (req, res) => {
//   const instructorId = req.user?.id; 
//   console.log(instructorId);// Ensure user ID is extracted from the token
//     try {
//       const courseData = req.body;
//       const newlyCreatedCourse = new Course(courseData);
//       const saveCourse = await newlyCreatedCourse.save();
  
//       if (saveCourse) {
//         res.status(201).json({
//           success: true,
//           message: "Course saved successfully",
//           data: saveCourse,
//         });
//       }
//     } catch (e) {
//       console.log(e);
//       res.status(500).json({
//         success: false,
//         message: "Some error occured!",
//       });
//     }
// };


exports.addNewCourseController = async (req, res) => {
  const instructorId = req.user?.id; 
  
  try {
    // Ensure instructorId is added to the course data
    const courseData = {
      ...req.body,
      instructorId: instructorId
    };

    const newlyCreatedCourse = new Course(courseData);
    const saveCourse = await newlyCreatedCourse.save();

    res.status(201).json({
      success: true,
      message: "Course saved successfully",
      data: saveCourse,
    });
  } catch (e) {
    console.error("Error in addNewCourseController:", e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
      error: e.message
    });
  }
};


exports.deleteCourseController = async (req, res) => {
  try {
    const { courseId } = req.params; // Assuming courseId is passed in the URL

    // Find and delete the course
    const deletedCourse = await Course.findByIdAndDelete(courseId);

    // Check if course was actually found and deleted
    if (deletedCourse) {
      res.status(200).json({
        success: true,
        message: "Course deleted successfully",
        data: deletedCourse
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while deleting course"
    });
  }
};



exports.getAllCoursesController = async (req, res) => {
  try {
    const instructorName = req.user.userName; // Use userName instead of ID
    
    console.log("Instructor Name:", instructorName);

    // Find courses by instructorName
    const coursesList = await Course.find({ instructorName });
    
    console.log("Courses Found:", coursesList);
    console.log("Courses Count:", coursesList.length);

    res.status(200).json({
      success: true,
      data: coursesList,
    });
  } catch (e) {
    console.error("Error fetching courses:", e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
      errorDetails: e.message
    });
  }
};





exports.getCourseDetailsByIDController = async (req, res) => {
    try {
      const { id } = req.params;
      const courseDetails = await Course.findById(id);
  
      if (!courseDetails) {
        return res.status(404).json({
          success: false,
          message: "Course not found!",
        });
      }
  
      res.status(200).json({
        success: true,
        data: courseDetails,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Some error occured!",
      });
    }
};


exports.updateCourseByIDController = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedCourseData = req.body;
  
      const updatedCourse = await Course.findByIdAndUpdate(
        id,
        updatedCourseData,
        { new: true }
      );
  
      if (!updatedCourse) {
        return res.status(404).json({
          success: false,
          message: "Course not found!",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Some error occured!",
      });
    }
};