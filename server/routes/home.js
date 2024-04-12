const express = require("express");
const router = express.Router();
const control = require("../controllers/home");

router.route("/courses").get(control.getCourses);
router.route("/courses/:id").get(control.getSingleCourse);

module.exports = router;
