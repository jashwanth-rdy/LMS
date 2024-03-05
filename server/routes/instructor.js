const express = require("express");
const router = express.Router();
// const catchAsync = require("../utils/catchAsync");

const { Signup, Login, Logout } = require("../controllers/instructors");
const { instVerification } = require("../middlewares/instructor");

router.post("/", instVerification);
router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", Logout);

module.exports = router;