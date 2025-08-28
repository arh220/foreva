async function checkAuth(req, res, next) {
  if (!req.user) {
    return res.render("signin", { error: "You Must Be Logged In... " });
  }
  return next();
}
module.exports = { checkAuth };
