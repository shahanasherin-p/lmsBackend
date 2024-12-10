const express = require("express");
const userController=require('../controllers/userController')
const authMiddleware=require('../middleware/authMiddleware')
const router = express.Router();

router.post('/register',userController.registerUserController)
router.post('/login',userController.loginUserController)
router.get("/check-auth", authMiddleware, (req, res) => {
    const user = req.user;
  
    res.status(200).json({
      success: true,
      message: "Authenticated user!",
      data: {
        user,
      },
    });
});

module.exports=router