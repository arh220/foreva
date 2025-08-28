const User = require("../../models/user/signup");
const bcrypt = require("bcrypt");
const { uploadImage } = require("../../utils/cloudinary");
const fs = require("fs");
const { sendmail } = require("../../utils/nodemailer");
const jwt = require("jsonwebtoken");

async function signupUser(req, res) {
  const { name, email, mo, password, city, dob, gender } = req.body;
  const hashpass = await bcrypt.hash(password, 10);
  const proimage = req.file;
  const existinuser = await User.findOne({ email });
  if (existinuser) {
    return res.render("signup", { error: "Email Alredy Exist..." });
  }
  const { secure_url, public_id } = await uploadImage(proimage.path);
  fs.unlinkSync(proimage.path);
  await User.create({
    name,
    email,
    password: hashpass,
    mo,
    city,
    dob,
    gender,
    image: secure_url,
    imageId: public_id
  });
  await sendmail(email, "welcome to our website", `Hii, ${name} Thank You for Registring!!!`);
  res.redirect("/");
}
async function signInUser(req, res) {
  const { email, password } = req.body;
  const selecteduser = await User.findOne({ email });
  if (!selecteduser) {
    return res.render("signup", { error: "Email Not Registered..." });
  }
  const ismatch = await bcrypt.compare(password, selecteduser.password);
  if (!ismatch) {
    return res.render("signin", { error: "Incorrect Password..." });
  }
  const token = await jwt.sign(
    {
      id: selecteduser._id,
      email: selecteduser.email,
      image: selecteduser.image,
      role: selecteduser.role || "user"
    },
    process.env.JWT_SECRETKEY
  );
  res.cookie("usertoken", token).redirect("/");
}
async function signOut(req, res) {
  return res.clearCookie("usertoken").redirect("/");
}
module.exports = { signupUser, signInUser, signOut };
