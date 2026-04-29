const express = require("express");
const authMiddleware = require("../Middlewares/auth.middleware");
const { registerController, loginController, googleLoginController, workRegisterController, pgRegisterController, toggleWishlist } = require("../controller/auth.controller");

const router = express.Router();
router.post("/login", loginController);
router.post("/wishlist", authMiddleware, toggleWishlist);
router.get("/home", authMiddleware, async (req, res) => {
  try {
    return res.status(200).json({
      message: "User loggedin successfully",
      user: req.user,
    });
  } catch (error) {
    console.log("error in home->", error);
  }
});

router.post("/user-register", registerController);
router.post("/worker-register", workRegisterController);
router.post("/google/login", googleLoginController);
router.post("/pg-register", pgRegisterController);



module.exports = router;