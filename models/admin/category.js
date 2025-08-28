const mongoose = require("mongoose");
const categorySchema = mongoose.Schema(
  {
    catname: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
const Category = mongoose.model("category", categorySchema);
module.exports = Category;
