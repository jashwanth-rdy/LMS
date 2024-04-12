const mongoose = require("mongoose");
const Inst = require("../models/instructor");
const Course = require("../models/course");
const Section = require("../models/section");
const Lecture = require("../models/lecture");

const getCourses = async (req, res) => {
  // console.log(req);
  try {
    const courses = await Course.find()
      .sort({ rating: -1 })
      .limit(8)
      .populate("instructor", "name")
      .exec();

    console.log(courses);
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
    // const email = req.user;
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
    res.status(201).json({ course, sections, lectures });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { getCourses, getSingleCourse };
