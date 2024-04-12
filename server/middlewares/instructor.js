const jwt = require("jsonwebtoken");
const Inst = require("../models/instructor");
const Course = require("../models/course");
const Section = require("../models/section");

module.exports.verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  // console.log(token);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token
    // console.log(decoded);
    req.user = decoded.userInfo.user;
    req.role = decoded.userInfo.role;
    next();
  });
};

module.exports.verifyAuthor = async (req, res, next) => {
  try {
    const course_id = req.params.id;
    const email = req.user;
    const course = await Course.findById(course_id).exec();
    if (!course) {
      return res.sendStatus(403);
    }
    const inst = await Inst.findOne({ email });
    if (!inst) {
      return res.sendStatus(403);
    }
    if (!course.instructor.equals(inst._id)) {
      return res.sendStatus(403);
    }
    next();
  } catch (err) {
    console.log(err);
  }
};
