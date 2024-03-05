const Inst = require("../models/instructor");
const {
  createAccessToken,
  createRefreshToken,
} = require("../utils/createSecretToken");
const bcrypt = require("bcrypt");

module.exports.Signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!user || !password || !name)
      return res
        .status(400)
        .json({ message: "Name, Email and password are required." });

    const existingInst = await Inst.findOne({ email });
    if (existingInst) {
      return res.status(409).json({ message: "Instructor already exists" });
    }
    const inst = await Inst.create({ name, email, password });
    console.log(inst);
    res.status(201).json({ message: "Signup Success", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }
    const inst = await Inst.findOne({ email });
    if (!inst) {
      return res.status(401).json({ message: "Incorrect email" });
    }
    const auth = await bcrypt.compare(password, inst.password);
    if (!auth) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    const userInfo = {
      id: inst._id,
      user: inst.email,
      role: 0,
    };
    const accessToken = createAccessToken(userInfo);
    const refreshToken = createRefreshToken({ user: inst.email });
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
    res.status(500).json({ message: error.message });
  }
};

module.exports.Logout = async (req, res) => {
  // Set token to none and expire after 5 seconds
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUser = await Inst.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
};
