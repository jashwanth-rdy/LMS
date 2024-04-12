const mongoose = require("mongoose");
// const Inst = require("../models/instructor");
const Stud = require("../models/student");
const Course = require("../models/course");
const Section = require("../models/section");
const Lecture = require("../models/lecture");
const Enroll = require("../models/enroll");
const { userSchema } = require("../schemas");
const {
  createAccessToken,
  createRefreshToken,
} = require("../utils/createSecretToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !password || !email)
      return res.status(400).json({
        success: false,
        message: "Name, Email and password are required.",
      });
    const { error } = await userSchema.validateAsync({
      name: name,
      email: email,
      password: password,
    });
    if (error)
      return res.status(400).json({
        success: false,
        message: "Invalid format of name, email or password",
      });
    const existingStud = await Stud.findOne({ email });
    if (existingStud) {
      return res
        .status(200)
        .json({ success: false, message: "Student already exists" });
    }
    const hashedPwd = await bcrypt.hash(password, 12);
    const stud = await Stud.create({
      name: name,
      email: email,
      password: hashedPwd,
    });
    res.status(201).json({ message: "Signup Success", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(200)
        .json({ success: false, message: "Email and password are required." });
    }
    const stud = await Stud.findOne({ email });
    if (!stud) {
      return res
        .status(200)
        .json({ success: false, message: "Incorrect email" });
    }
    const auth = await bcrypt.compare(password, stud.password);
    if (!auth) {
      return res
        .status(200)
        .json({ success: false, message: "Incorrect password" });
    }
    const studInfo = {
      id: stud._id,
      user: stud.email,
      role: 1,
    };
    // console.log(studInfo);
    const accessToken = createAccessToken(studInfo);
    const refreshToken = createRefreshToken({ user: stud.email });
    stud.refreshToken = refreshToken;
    const result = await stud.save();
    // console.log(result);
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      message: "Logged in successfully",
      success: true,
      role: 1,
      accessToken: accessToken,
      user: stud.email,
    });
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const refreshTokenController = async (req, res) => {
  //   console.log("refreshtoken");
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundStud = await Stud.findOne({ refreshToken }).exec();
  if (!foundStud) return res.sendStatus(403); //Forbidden
  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundStud.email !== decoded.user) return res.sendStatus(403);
    const studInfo = {
      id: foundStud._id,
      user: foundStud.email,
      role: 1,
    };
    // console.log(studInfo);
    const accessToken = createAccessToken(studInfo);
    res.json({
      message: "Access Token generated succesfully",
      success: true,
      role: 1,
      accessToken: accessToken,
      user: foundStud.email,
    });
  });
};

const Logout = async (req, res) => {
  // On client, also delete the accessToken

  // console.log(req);
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    console.log("No cookie found");
    return res.sendStatus(204);
  } //No content
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundStud = await Stud.findOne({ refreshToken }).exec();
  if (!foundStud) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  foundStud.refreshToken = "";
  const result = await foundStud.save();
  // console.log("Logout", result);

  res.clearCookie("jwt", {
    path: "/",
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  //   console.log("logged out");
  res.status(204).json({ message: "Logged Out Successfully" });
};

const getCourses = async (req, res) => {
  // console.log(req);
  try {
    const courses = await Course.find()
      .sort({ rating: -1 })
      .limit(8)
      .populate("instructor", "name")
      .exec();

    // console.log(courses);
    if (!courses)
      return res
        .status(204)
        .json({ success: true, message: "No Courses found." });
    res.status(201).json({ success: true, courses: courses });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
};

const getSingleCourse = async (req, res) => {
  try {
    const email = req.user;
    const stud = await Stud.findOne({ email }).exec();
    if (!stud) {
      return res.sendStatus(403);
    }
    const course_id = req.params.id;
    const course = await Course.findById(course_id)
      .populate("instructor", "name")
      .exec();
    if (!course) {
      return res.sendStatus(403);
    }
    const sections = await Section.find({ course: course_id });
    const lectures = [];
    for (let i = 0; i < sections.length; i++) {
      const lecs = await Lecture.find({ section: sections[i]._id });
      lectures.push(lecs);
    }
    const enrolled = await Enroll.findOne({
      course: course_id,
      student: stud._id,
    });
    return res.status(201).json({
      course,
      sections,
      lectures,
      enrolled: enrolled ? true : false,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const enrollCourse = async (req, res) => {
  try {
    const course_id = req.params.id;
    const email = req.user;
    const stud = await Stud.findOne({ email }).exec();
    if (!stud) {
      return res.sendStatus(403);
    }
    const enrolled = await Enroll.findOne({
      course: course_id,
      student: stud._id,
    });
    // console.log(enrolled);
    if (enrolled) {
      return res
        .status(200)
        .json({ success: false, message: "Already enrolled in course" });
    }
    const enroll = await Enroll.create({
      course: course_id,
      student: stud._id,
    });
    return res
      .status(201)
      .json({ success: true, message: "Enrolled Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getMyCourses = async (req, res) => {
  try {
    const email = req.user;
    const stud = await Stud.findOne({ email }).exec();
    if (!stud) {
      return res.sendStatus(403);
    }
    const courses = await Enroll.find({ student: stud._id })
      .populate("course")
      .exec();
    // console.log(courses);
    res.status(201).json({ success: true, courses: courses });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const learnCourse = async (req, res) => {
  try {
    const email = req.user;
    const stud = await Stud.findOne({ email }).exec();
    if (!stud) {
      return res.sendStatus(403);
    }
    const course_id = req.params.id;
    const course = await Course.findById(course_id)
      .populate("instructor", "name")
      .exec();
    const sections = await Section.find({ course: course_id });
    const lectures = [];
    for (let i = 0; i < sections.length; i++) {
      const lecs = await Lecture.find({ section: sections[i]._id });
      lectures.push(lecs);
    }
    // console.log(enrolled);
    res.status(201).json({
      success: true,
      course,
      sections,
      lectures,
      rating: req.rating,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateRating = async (req, res) => {
  try {
    const email = req.user;
    const stud = await Stud.findOne({ email }).exec();
    if (!stud) {
      return res.sendStatus(403);
    }
    const course_id = req.params.id;
    const course = await Course.findById(course_id).exec();
    if (!course) {
      return res.sendStatus(403);
    }
    const enroll = await Enroll.findOne({
      course: course_id,
      student: stud._id,
    }).exec();
    if (!enroll) {
      return res.sendStatus(403);
    }
    enroll.rating = req.body.rating;
    await enroll.save();
    const result = await Enroll.find({
      course: course_id,
      rating: { $gt: 0 },
    });
    if (result.length > 0) {
      let total = 0;
      for (let i = 0; i < result.length; i++) {
        total += result[i].rating;
      }
      course.rating = total / result.length;
      course.numofratings = result.length;
      await course.save();
    }

    res.status(201).json({ success: true, message: "rating updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  Signup,
  Login,
  refreshTokenController,
  Logout,
  getCourses,
  getSingleCourse,
  enrollCourse,
  getMyCourses,
  learnCourse,
  updateRating,
};
