const User = require("../../models/user/signup");
const bcrypt = require("bcrypt");
const { uploadImage } = require("../../utils/cloudinary");
const fs = require("fs");
const { sendmail } = require("../../utils/nodemailer");
const jwt = require("jsonwebtoken");

async function signupUser(req, res) {
  try {
    const { name, email, mo, password, city, dob, gender } = req.body;
    const hashpass = await bcrypt.hash(password, 10);
    const proimage = req.file;

    const existinuser = await User.findOne({ email });
    if (existinuser) {
      return res.render("signup", { error: "Email Already Exist..." });
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

    return res.redirect("/");
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).render("signup", { error: "Something went wrong, try again." });
  }
}

async function signInUser(req, res) {
  try {
    const { email, password } = req.body;
    const selecteduser = await User.findOne({ email });

    if (!selecteduser) {
      return res.render("signup", { error: "Email Not Registered..." });
    }

    const ismatch = await bcrypt.compare(password, selecteduser.password);
    if (!ismatch) {
      return res.render("signin", { error: "Incorrect Password..." });
    }

    const token = jwt.sign(
      {
        id: selecteduser._id,
        email: selecteduser.email,
        image: selecteduser.image,
        role: selecteduser.role || "user"
      },
      process.env.JWT_SECRETKEY
    );

    return res.cookie("usertoken", token).redirect("/");
  } catch (err) {
    console.error("Signin error:", err);
    return res.status(500).render("signin", { error: "Something went wrong, try again." });
  }
}

async function signOut(req, res) {
  try {
    return res.clearCookie("usertoken").redirect("/");
  } catch (err) {
    console.error("Signout error:", err);
    return res.status(500).redirect("/signin");
  }
}

module.exports = { signupUser, signInUser, signOut };
