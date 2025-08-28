const Category = require("../../models/admin/category");
const Item = require("../../models/admin/items");

async function getAllItem(req, res) {
  const catId = await Category.findById(req.params.id);
  console.log("selectItem", catId);
  const selectItem = await Item.find({ catid: catId }).populate("catid");
  res.render("items", { selectItem });
}

module.exports = { getAllItem };
