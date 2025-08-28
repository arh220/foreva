const jwt = require("jsonwebtoken");
async function verifyToken(req, res, next) {
  const token = req.cookies?.usertoken;
  if (!token) {
    return next();
  }
  const decode = await jwt.verify(token, process.env.JWT_SECRETKEY);
  req.user = decode;
  next();
}
module.exports = verifyToken;
