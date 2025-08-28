const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
  try {
    const token = req.cookies?.usertoken;
    if (!token) {
      return next(); 
    }

    const decode = jwt.verify(token, process.env.JWT_SECRETKEY);
    req.user = decode;
    return next(); 
  } catch (err) {
    console.error("Invalid or expired token:", err.message);
    req.user = null;
    return next(); 
  }
}

module.exports = verifyToken;
