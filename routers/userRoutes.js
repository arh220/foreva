const express = require("express");
const { signupUser, signInUser, signOut } = require("../controllers/user/signup");
const upload = require("../utils/multer");
const verifyToken = require("../middleware/verifytoken");
const everypageInUser = require("../middleware/everypageinuser");
const { getAllcat } = require("../controllers/user/allcat");
const { getAllItem } = require("../controllers/user/allitem");
const ShowCartPage = require("../controllers/user/cart");
const { checkAuth } = require("../middleware/checkauth");
const orderConform = require("../controllers/user/order");
const router = express.Router();

router.use(verifyToken);
router.use(everypageInUser);

router.get("/", getAllcat);
router.get("/signup", (req, res) => {
  res.render("signup", { error: null });
});
router.post("/signup", upload.single("image"), signupUser);
router.get("/signin", (req, res) => {
  res.render("signin", { error: null });
});
router.post("/signin", signInUser);
router.get("/signout", signOut);
router.get("/contact", (req, res) => {
  res.render("contact");
});

router.get("/item/:id", getAllItem);
router.get("/cart", checkAuth, ShowCartPage);
router.get("/checkout", (req, res) => {
  res.render("checkout");
});
router.post("/conformorder", orderConform);

module.exports = router;
