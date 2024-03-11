const express = require("express");
const router = express.Router();
// const catchAsync = require("../utils/catchAsync");

const control = require("../controllers/instructors");
const { verifyJWT } = require("../middlewares/instructor");

router.route("/signup").post(control.Signup);
router.route("/login").post(control.Login);
router.route("/logout").post(control.Logout);
router.route("/").post(verifyJWT, (req, res, next) => {
  res.status(200).json({ success: true, message: "Passed Middleware" });
});
router.route("/refresh").get(control.refreshTokenController);
router.route("/courses").get(verifyJWT, control.getCourses);

module.exports = router;
