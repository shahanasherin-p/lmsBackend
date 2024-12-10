const Course = require('../../models/courseModel');

exports.getCoursesByStudentIdController = async (req, res) => {
  try {
    const { studentId } = req.params;
    console.log('Querying for studentId:', studentId);
    
    // Correct query using studentId field
    const studentBoughtCourses = await Course.find({
      'students.studentId': studentId
    });
    
    console.log('Query results:', studentBoughtCourses);
    
    // If no courses found, return an empty array
    if (!studentBoughtCourses || studentBoughtCourses.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No courses found for this student"
      });
    }
    
    res.status(200).json({
      success: true,
      data: studentBoughtCourses,
    });
  } catch (error) {
    console.error("Error in getCoursesByStudentIdController:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching student courses",
      errorDetails: error.message
    });
  }
};



// exports.getCoursesByStudentIdController = async (req, res) => {
//   try {
//     const { studentId } = req.params;

//     // Find courses where the student is in the students array
//     const studentBoughtCourses = await Course.find({
//       'students.studentId': studentId
//     });

//     // If no courses found, return an empty array
//     if (!studentBoughtCourses || studentBoughtCourses.length === 0) {
//       return res.status(200).json({
//         success: true,
//         data: [],
//         message: "No courses found for this student"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: studentBoughtCourses,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching student courses",
//       errorDetails: error.message
//     });
//   }
// };