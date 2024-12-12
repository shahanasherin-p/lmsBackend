const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: {
    type:String,
    required:true

  },
  userName: String,
  userEmail: String,
  orderStatus: String,
  paymentMethod: String,
  paymentStatus: String,
  orderDate: Date,
  paymentId: String,
  payerId: String,
  instructorId: String,
  instructorName: String,
  courseImage: String,
  courseTitle: String,
  courseId: {
    type:String,
    required:true

  },
  coursePricing: String,
});

module.exports = mongoose.model("Order", OrderSchema);
