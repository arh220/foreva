const Category = require("../../models/admin/category");
const Item = require("../../models/admin/items");

async function getAllcat(req, res) {
  const getAllcat = await Category.find().limit(5);
  const alliIems = await Item.find();
  // console.log(alliIems);
  res.render("home", { getAllcat: getAllcat || [], alliIems: alliIems || [] });
}
module.exports = { getAllcat };
