const StudentCourses = require('../../models/studentCourses'); // Ensure the path is correct

exports.getCoursesByStudentIdController = async (req, res) => {
  try {
    const { studentId } = req.params;
    console.log('Querying for studentId:', studentId);
    
    // Correct query using userId field
    const studentBoughtCourses = await StudentCourses.findOne({
      userId: studentId
    });
    
    console.log('Query results:', studentBoughtCourses);
    
    // If no courses found, return an empty array
    if (!studentBoughtCourses || studentBoughtCourses.courses.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No courses found for this student"
      });
    }
    
    res.status(200).json({
      success: true,
      data: studentBoughtCourses.courses,
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
//     console.log('Querying for studentId:', studentId);
    
//     // Fetch the student courses
//     const studentBoughtCourses = await StudentCourses.findOne({
//       userId: studentId,
//     });
    
//     console.log('Query results:', studentBoughtCourses);

//     // If no courses found, return an empty array
//     if (!studentBoughtCourses || studentBoughtCourses.courses.length === 0) {
//       return res.status(200).json({
//         success: true,
//         data: [],
//         message: "No courses found for this student",
//       });
//     }

//     // Filter unique courses by courseId
//     const uniqueCourses = Object.values( //Why Object.values? It converts the accumulator object back into an array containing only the unique courses.
      
//       studentBoughtCourses.courses.reduce((acc, course) => { //The reduce function is used to accumulate courses into an object (acc) where the key is the courseId.
//         if (!acc[course.courseId]) {
//           acc[course.courseId] = course;
//         }
//         return acc;
//       }, {})
//     );

//     res.status(200).json({
//       success: true,
//       data: uniqueCourses,
//     });
//   } catch (error) {
//     console.error("Error in getCoursesByStudentIdController:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching student courses",
//       errorDetails: error.message,
//     });
//   }
// };
