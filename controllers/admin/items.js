const Category = require("../../models/admin/category");
const Item = require("../../models/admin/items");
const { uploadImage, deleteImageFromCloudinary } = require("../../utils/cloudinary");
const fs = require("fs");

async function AddItemspage(req, res) {
  const allcat = await Category.find();
  res.render("admin/additems", { allcat });
}
async function createCategoryItem(req, res) {
  const { catid, itemname, mrp, disc } = req.body;
  const itemImage = req.file;
  const { secure_url, public_id } = await uploadImage(itemImage.path);
  fs.unlinkSync(itemImage.path);
  await Item.create({
    catid,
    itemname,
    mrp,
    disc,
    image: secure_url,
    imageId: public_id
  });
  res.redirect("/admin/additem");
}
async function getAllItems(req, res) {
  const allItems = await Item.find().populate("catid");
  res.render("admin/allitems", { allItems });
}
async function editItemPage(req, res) {
  const selectedItem = await Item.findById(req.params.id);
  res.render("admin/edititem", { selectedItem });
}
async function updateItem(req, res) {
  const { itemname, mrp, disc } = req.body;
  const itemimge = req.file;
  const selecteditem = await Item.findById(req.params.id);

  (selecteditem.itemname = itemname), (selecteditem.mrp = mrp), (selecteditem.disc = disc);

  if (itemimge) {
    await deleteImageFromCloudinary(selecteditem.imageId);
    const { secure_url, public_id } = await uploadImage(itemimge.path);
    fs.unlinkSync(itemimge.path);
    selecteditem.image = secure_url;
    selecteditem.imageId = public_id;
  }

  await selecteditem.save();
  return getAllItems(req, res);
}
async function deleteItem(req, res) {
  const item = await Item.findById(req.params.id);
  await deleteImageFromCloudinary(item.imageId);
  await Item.findByIdAndDelete(req.params.id);
  return getAllItems(req, res);
}
module.exports = { AddItemspage, createCategoryItem, getAllItems, editItemPage, updateItem, deleteItem };
