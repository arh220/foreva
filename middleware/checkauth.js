async function checkAuth(req, res, next) {
  if (!req.user) {
    res.render("signin", { error: "You Must Be Logged In... " });
  }
  next();
}
module.exports = { checkAuth };
