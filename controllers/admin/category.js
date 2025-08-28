const Category = require("../../models/admin/category");

async function createCategory(req, res) {
  const { catname } = req.body;
  await Category.create({ catname });
  res.redirect("/admin/home");
}
async function getAllCategory(req, res) {
  const allCategories = await Category.find();
  res.render("admin/allcat", { allCategories });
}
async function deleteCategory(req, res) {
  await Category.findByIdAndDelete(req.params.id);
  return getAllCategory(req, res);
}
module.exports = { createCategory, getAllCategory, deleteCategory };
