const express = require("express");
const { createOrderController, capturePaymentAndFinalizeOrderController } = require("../../controllers/studentController/orderController");

const router = express.Router();

router.post("/create", createOrderController);
router.post("/capture", capturePaymentAndFinalizeOrderController);

module.exports = router;
