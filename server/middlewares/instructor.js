const Inst = require("../models/instructor");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.instVerification = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const inst = await Inst.findById(data.id);
      if (inst) return res.json({ status: true, inst: inst.name });
      else return res.json({ status: false });
    }
  });
};
