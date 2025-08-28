const mongoose = require("mongoose");
const ItemSchema = mongoose.Schema(
  {
    catid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category"
    },
    itemname: {
      type: String,
      required: true
    },
    disc: {
      type: String,
      required: true
    },
    mrp: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    imageId: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
const Item = mongoose.model("item", ItemSchema);
module.exports = Item;
