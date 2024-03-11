const Inst = require("../models/instructor");
const Course = require("../models/course");
const { instSchema } = require("../schemas");
const {
  createAccessToken,
  createRefreshToken,
} = require("../utils/createSecretToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !password || !email)
      return res.status(400).json({
        success: false,
        message: "Name, Email and password are required.",
      });
    const { error } = await instSchema.validateAsync({
      name: name,
      email: email,
      password: password,
    });
    if (error)
      return res.status(400).json({
        success: false,
        message: "Invalid format of name, email or password",
      });
    const existingInst = await Inst.findOne({ email });
    if (existingInst) {
      return res
        .status(200)
        .json({ success: false, message: "Instructor already exists" });
    }
    const hashedPwd = await bcrypt.hash(password, 12);
    const inst = await Inst.create({
      name: name,
      email: email,
      password: hashedPwd,
    });
    console.log(inst);
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
    const inst = await Inst.findOne({ email });
    if (!inst) {
      return res
        .status(200)
        .json({ success: false, message: "Incorrect email" });
    }
    const auth = await bcrypt.compare(password, inst.password);
    if (!auth) {
      return res
        .status(200)
        .json({ success: false, message: "Incorrect password" });
    }
    const instInfo = {
      id: inst._id,
      user: inst.email,
      role: 0,
    };
    console.log(instInfo);
    const accessToken = createAccessToken(instInfo);
    const refreshToken = createRefreshToken({ user: inst.email });
    inst.refreshToken = refreshToken;
    const result = await inst.save();
    console.log(result);
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      message: "Logged in successfully",
      success: true,
      role: 0,
      accessToken: accessToken,
      user: inst.email,
    });
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const refreshTokenController = async (req, res) => {
  console.log("refreshtoken", req);
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundInst = await Inst.findOne({ refreshToken }).exec();
  if (!foundInst) return res.sendStatus(403); //Forbidden
  // evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.INST_REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err || foundInst.email !== decoded.user) return res.sendStatus(403);
      const instInfo = {
        id: foundInst._id,
        user: foundInst.email,
        role: 0,
      };
      console.log(instInfo);
      const accessToken = createAccessToken(instInfo);
      res.json({
        message: "Access Token generated succesfully",
        success: true,
        role: 0,
        accessToken: accessToken,
        user: foundInst.email,
      });
    }
  );
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
  const foundInst = await Inst.findOne({ refreshToken }).exec();
  if (!foundInst) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  foundInst.refreshToken = "";
  const result = await foundInst.save();
  // console.log("Logout", result);

  res.clearCookie("jwt", {
    path: "/",
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.status(204).json({ message: "Logged Out Successfully" });
};

const getCourses = async (req, res) => {
  console.log(req);
  const email = req.user;
  const inst = await Inst.findOne({ email }).exec();
  const courses = await Course.find({ instructor: inst._id });
  console.log(courses);
  if (!courses) return res.status(204).json({ message: "No Courses found." });
  res.status(201).json(courses);
};

module.exports = {
  Signup,
  Login,
  Logout,
  refreshTokenController,
  getCourses,
};
