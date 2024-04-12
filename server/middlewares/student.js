const jwt = require("jsonwebtoken");
const Inst = require("../models/instructor");
const Stud = require("../models/student");
const Course = require("../models/course");
const Enroll = require("../models/enroll");

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
    const stud = await Stud.findOne({ email }).exec();
    if (!stud) {
      return res.sendStatus(403);
    }
    const enroll = await Enroll.findOne({
      course: course_id,
      student: stud._id,
    }).exec();
    if (!enroll) {
      return res.sendStatus(403);
    }
    req.rating = enroll.rating;
    next();
  } catch (err) {
    console.log(err);
  }
};
