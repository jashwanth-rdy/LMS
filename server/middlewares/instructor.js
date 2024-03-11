const jwt = require("jsonwebtoken");

module.exports.verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  console.log(token);
  jwt.verify(token, process.env.INST_ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token
    console.log(decoded);
    req.user = decoded.userInfo.user;
    req.role = decoded.userInfo.role;
    next();
  });
};

