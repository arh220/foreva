const jwt = require("jsonwebtoken");
async function adminTokenVerify(req, res, next) {
  const token = req.cookies.admintoken;
  if (!token) {
    return next();
  }
  const decode = await jwt.verify(token, process.env.JWT_SECRETKEY);
  req.user = decode;
  next();
}
module.exports = adminTokenVerify;
