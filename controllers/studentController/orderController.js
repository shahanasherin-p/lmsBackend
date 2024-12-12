const paypal = require("../../helpers/paypal");
const Order = require("../../models/order");
const Course = require("../../models/courseModel");
const StudentCourses = require("../../models/studentCourses");

exports.createOrderController = async (req, res) => {
  const studentId = req.user?.id; // Ensure user ID is extracted from the token
    console.log("Student ID:", studentId);

  try {
    const {
      userId,
      userName,
      userEmail,
      orderStatus,
      paymentMethod,
      paymentStatus,
      orderDate,
      paymentId,
      payerId,
      instructorId,
      instructorName,
      courseImage,
      courseTitle,
      courseId,
      coursePricing,
    } = req.body;

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: `${process.env.CLIENT_URL}/payment-return`,
        cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: courseTitle,
                sku: courseId,
                price: coursePricing,
                currency: "USD",
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: "USD",
            total: coursePricing.toFixed(2),
          },
          description: courseTitle,
        },
      ],
    };

    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "Error while creating paypal payment!",
        });
      } else {
        const newlyCreatedCourseOrder = new Order({
          userId:studentId,
          userName,
          userEmail,
          orderStatus,
          paymentMethod,
          paymentStatus,
          orderDate,
          paymentId,
          payerId,
          instructorId,
          instructorName,
          courseImage,
          courseTitle,
          courseId,
          coursePricing,
        });

        await newlyCreatedCourseOrder.save();

        const approveUrl = paymentInfo.links.find(
          (link) => link.rel == "approval_url"
        ).href;

        res.status(201).json({
          success: true,
          data: {
            approveUrl,
            orderId: newlyCreatedCourseOrder._id,
          },
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

exports.capturePaymentAndFinalizeOrderController = async (req, res) => {
  try {
      const { paymentId, payerId, orderId } = req.body;
      
      // Find the order
      let order = await Order.findById(orderId);
      
      // Check if the order exists
      if (!order) {
          return res.status(404).json({
              success: false,
              message: "Order cannot be found",
          });
      }
      
      // Update order status and payment details
      order.paymentStatus = "paid";
      order.orderStatus = "confirmed";
      order.paymentId = paymentId;
      order.payerId = payerId;
      await order.save();
      console.log("Order updated:", order);
      
      // Find or create StudentCourses document
      let studentCourses = await StudentCourses.findOne({ userId: order.userId });
      
      // Check if course already exists
      const courseExists = studentCourses && 
          studentCourses.courses.some(
              course => course.courseId.toString() === order.courseId.toString()
          );
      
      // Add course if it doesn't exist
      if (!studentCourses) {
          // Create new StudentCourses document if it doesn't exist
          studentCourses = await StudentCourses.create({
              userId: order.userId,
              courses: [{
                  courseId: order.courseId,
                  title: order.courseTitle,
                  instructorId: order.instructorId,
                  instructorName: order.instructorName,
                  dateOfPurchase: order.orderDate,
                  courseImage: order.courseImage,
              }]
          });
      } else if (!courseExists) {
          // Add course to existing StudentCourses document
          studentCourses.courses.push({
              courseId: order.courseId,
              title: order.courseTitle,
              instructorId: order.instructorId,
              instructorName: order.instructorName,
              dateOfPurchase: order.orderDate,
              courseImage: order.courseImage,
          });
          await studentCourses.save();
      }
      
      console.log("Student courses updated:", studentCourses);
      
      // Update the course schema with students
      await Course.findByIdAndUpdate(order.courseId, {
          $addToSet: {
              students: {
                  studentId: order.userId,
                  studentName: order.userName,
                  studentEmail: order.userEmail,
                  paidAmount: order.coursePricing,
              },
          },
      });
      
      console.log("Course schema students updated");
      
      // Respond with success
      res.status(200).json({
          success: true,
          message: "Order confirmed",
          data: order,
      });
  } catch (err) {
      console.error("Error in capturePaymentAndFinalizeOrderController:", err);
      res.status(500).json({
          success: false,
          message: "Some error occurred!",
          error: err.message
      });
  }
};





