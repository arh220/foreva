const bcrypt = require("bcrypt");
const User = require("../../models/user/signup");
const { uploadImage } = require("../../utils/cloudinary");
const fs = require("fs");
const jwt = require("jsonwebtoken");

async function adminUserSignup(req, res) {
  const { name, email, password, mo, city, gender, role, dob } = req.body;
  const proimage = req.file;
  const hashpass = await bcrypt.hash(password, 10);
  const existuser = await User.findOne({ email });
  if (existuser) {
    return res.render("admin/signup", { error: "User Alredy Exist.." });
  }
  const { secure_url, public_id } = await uploadImage(proimage.path);
  fs.unlinkSync(proimage.path);
  await User.create({
    name,
    email,
    password: hashpass,
    mo,
    city,
    gender,
    role,
    dob,
    image: secure_url,
    imageId: public_id
  });
  res.render("admin/home");
}
async function adminSignIn(req, res) {
  const { email, password } = req.body;
  const selecteduser = await User.findOne({ email, role: "ADMIN" });
  if (!selecteduser) {
    return res.render("admin/signin", { error: "Email not Register..." });
  }
  const ismatch = await bcrypt.compare(password, selecteduser.password);
  if (!ismatch) {
    return res.render("admin/signin", { error: "Incorrect Password" });
  }
  const token = await jwt.sign(
    {
      id: selecteduser._id,
      email: selecteduser.email,
      role: selecteduser.role,
      image: selecteduser.image
    },
    process.env.JWT_SECRETKEY
  );
  res.cookie("admintoken", token).redirect("/admin/home");
}
module.exports = { adminUserSignup, adminSignIn };
