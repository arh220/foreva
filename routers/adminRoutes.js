const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const { adminUserSignup, adminSignIn } = require("../controllers/admin/signup");
const adminTokenVerify = require("../middleware/admintokenverify");
const everyPageInAdminUser = require("../middleware/everypageinadmin");
const { createCategory, getAllCategory, deleteCategory } = require("../controllers/admin/category");
const {
  AddItemspage,
  createCategoryItem,
  getAllItems,
  editItemPage,
  updateItem,
  deleteItem
} = require("../controllers/admin/items");

router.use(adminTokenVerify);
router.use(everyPageInAdminUser);

router.get("/", (req, res) => {
  res.render("admin/signin", { error: null });
});
router.get("/home", (req, res) => {
  res.render("admin/home");
});
router.get("/signup", (req, res) => {
  res.render("admin/signup");
});
router.post("/signup", upload.single("image"), adminUserSignup);
router.post("/signin", adminSignIn);
router.get("/signout", (req, res) => {
  res.clearCookie("admintoken").redirect("/admin");
});
router.get("/addcat", (req, res) => {
  res.render("admin/addcat");
});
router.post("/addcat", createCategory);
router.get("/allcat", getAllCategory);
router.get("/delcat/:id", deleteCategory);

router.get("/additem", AddItemspage);
router.post("/createitem", upload.single("image"), createCategoryItem);
router.get("/allitem", getAllItems);
router.get("/edititem/:id", editItemPage);
router.post("/updateItem/:id", upload.single("image"), updateItem);
router.get("/delitem/:id", deleteItem);
router.get("/admin/allorders")

module.exports = router;
