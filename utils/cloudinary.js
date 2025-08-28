const cloudinary = require("cloudinary").v2;

async function cloudinaryConfig() {
  await cloudinary.config({
    cloud_name: "dobvvwnji",
    api_key: "483672756843375",
    api_secret: "TlQqKft3q-WnBD5PaKwayqoNjhQ"
  });
  console.log("cloudinary configration sucssessfully...");
}
async function uploadImage(imagepath) {
  const result = await cloudinary.uploader.upload(imagepath, { folder: "foreva" });
  return result;
}
async function deleteImageFromCloudinary(imageid) {
  await cloudinary.uploader.destroy(imageid);
}
module.exports = { cloudinaryConfig, uploadImage, deleteImageFromCloudinary };
