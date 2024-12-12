const express = require("express");
const { createOrderController, capturePaymentAndFinalizeOrderController } = require("../../controllers/studentController/orderController");
const authenticate = require("../../middleware/authMiddleware");

const router = express.Router();

router.post("/create",authenticate, createOrderController);
router.post("/capture",authenticate, capturePaymentAndFinalizeOrderController);

module.exports = router;
