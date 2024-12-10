const Course=require('../../models/courseModel')
const StudentCourses = require("../../models/studentCourses");

exports.getAllStudentViewCoursesController = async (req, res) => {
    try {
      const {
        category = [],
        level = [],
        primaryLanguage = [],
        sortBy = "price-lowtohigh",
      } = req.query;
  
      console.log(req.query, "req.query");
  
      let filters = {};
      if (category.length) {
        filters.category = { $in: category.split(",") };
      }
      if (level.length) {
        filters.level = { $in: level.split(",") };
      }
      if (primaryLanguage.length) {
        filters.primaryLanguage = { $in: primaryLanguage.split(",") };
      }
  
      let sortParam = {};
      switch (sortBy) {
        case "price-lowtohigh":
          sortParam.pricing = 1;
  
          break;
        case "price-hightolow":
          sortParam.pricing = -1;
  
          break;
        case "title-atoz":
          sortParam.title = 1;
  
          break;
        case "title-ztoa":
          sortParam.title = -1;
  
          break;
  
        default:
          sortParam.pricing = 1;
          break;
      }
  
      const coursesList = await Course.find(filters).sort(sortParam);
  
      res.status(200).json({
        success: true,
        data: coursesList,
      });
    } 
    
    catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Some error occured!",
      });
    }
};

exports.getStudentViewCourseDetailsController = async (req, res) => {
    try {
      const { id } = req.params;
      const courseDetails = await Course.findById(id);
  
      if (!courseDetails) {
        return res.status(404).json({
          success: false,
          message: "No course details found",
          data: null,
        });
      }
  
      res.status(200).json({
        success: true,
        data: courseDetails,
      });
    }
    catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Some error occured!",
      });
    }
};




exports.checkCoursePurchaseInfoController = async (req, res) => {
  try {
    // Extract course ID from route parameters
    const { id } = req.params;

    // Extract user ID (studentId) from the authenticated user
    const studentId = req.user?.id; // Ensure user ID is extracted from the token

    console.log("Request Params:", req.params);
    console.log("Authenticated User:", req.user);

    // Log input for debugging
    console.log("Course ID:", id);
    console.log("Student ID:", studentId);

    // Validate input
    if (!id || !studentId) {
      return res.status(400).json({
        success: false,
        message: "Course ID and Student ID are required",
      });
    }

    // Find student courses using userId field
    const studentCourses = await StudentCourses.findOne({
      userId: studentId, // Use userId exactly as in your database structure
    });

    // If no student courses found, return false
    if (!studentCourses) {
      return res.status(200).json({
        success: true,
        data: false,
        message: "No purchase history found",
      });
    }

    // Check if course is in student's courses
    const ifStudentAlreadyBoughtCurrentCourse = studentCourses.courses.some(
      (item) => item.courseId.toString() === id.toString()
    );

    res.status(200).json({
      success: true,
      data: ifStudentAlreadyBoughtCurrentCourse,
      message: ifStudentAlreadyBoughtCurrentCourse
        ? "Course already purchased"
        : "Course not purchased",
    });
  } catch (error) {
    console.error("Error in checkCoursePurchaseInfoController:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while checking course purchase",
      errorDetails: error.message,
    });
  }
};

