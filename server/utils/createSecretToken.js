require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createAccessToken = (id) => {
  return jwt.sign({ userInfo: id }, process.env.INST_ACCESS_TOKEN_SECRET, {
    expiresIn: "15s",
  });
};

module.exports.createRefreshToken = (id) => {
  console.log(id);
  return jwt.sign(id, process.env.INST_REFRESH_TOKEN_SECRET, {
    expiresIn: "1m",
  });
};
