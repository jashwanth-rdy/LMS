const express = require("express");
const router = express.Router();

const control = require("../controllers/instructors");
const { verifyJWT, verifyAuthor } = require("../middlewares/instructor");
const multer = require("multer");
const path = require("path");

const uploadDirectory = path.join(__dirname, "..", "public", "uploads");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory); // specify the destination folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // generate unique filename
  },
});
const upload = multer({ storage });

router.route("/signup").post(control.Signup);
router.route("/login").post(control.Login);
router.route("/logout").post(control.Logout);
router.route("/").post(verifyJWT, (req, res, next) => {
  res.status(200).json({ success: true, message: "Passed Middleware" });
});
router.route("/refresh").get(control.refreshTokenController);
router.route("/courses").get(verifyJWT, control.getCourses);
router
  .route("/courses/:id")
  .get(verifyJWT, verifyAuthor, control.getSingleCourse);
router
  .route("/newcourse")
  .post(verifyJWT, upload.single("file"), control.insertCourse);
router
  .route("/courses/:id/newsection")
  .post(verifyJWT, verifyAuthor, control.insertSection);
router
  .route("/courses/:id1/sections/:id2/newlecture")
  .post(verifyJWT, upload.single("file"), control.insertLecture);

module.exports = router;
