const mongoose = require("mongoose");
const orderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    mo: {
      type: Number,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    zip: {
      type: Number,
      required: true
    },
    createdAt: { type: Date, default: Date.now },
    cartItem: [
      {
        id: String,
        itemname: String,
        price: Number,
        qty: Number,
        total: Number
      }
    ],
    subtotal: Number,
    deliveryCharge: Number,
    grandTotal: Number
  },

  { timestamps: true }
);
const Order = mongoose.model("order", orderSchema);
module.exports = Order;
