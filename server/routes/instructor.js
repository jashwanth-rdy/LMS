const express = require("express");
const router = express.Router();
// const catchAsync = require("../utils/catchAsync");

const {
  Signup,
  Login,
  Logout,
  refreshTokenController,
} = require("../controllers/instructors");
const { verifyJWT } = require("../middlewares/instructor");

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", Logout);
router.post("/", verifyJWT, (req, res, next) => {
  res.status(200).json({ success: true, message: "Passed Middleware" });
});
router.get("/refresh", refreshTokenController);

module.exports = router;
