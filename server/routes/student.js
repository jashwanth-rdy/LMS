const express = require("express");
const router = express.Router();

const control = require("../controllers/student");
const { verifyJWT, verifyAuthor } = require("../middlewares/student");

router.route("/signup").post(control.Signup);
router.route("/login").post(control.Login);
router.route("/logout").post(control.Logout);
router.route("/refresh").get(control.refreshTokenController);
router.route("/courses").get(verifyJWT, control.getCourses);
router.route("/courses/:id").get(verifyJWT, control.getSingleCourse);
router
  .route("/courses/:id/rating/edit")
  .post(verifyJWT, verifyAuthor, control.updateRating);
router
  .route("/courses/:id/learn")
  .get(verifyJWT, verifyAuthor, control.learnCourse);
router.route("/mycourses").get(verifyJWT, control.getMyCourses);
router.route("/courses/:id/enroll").post(verifyJWT, control.enrollCourse);

module.exports = router;
