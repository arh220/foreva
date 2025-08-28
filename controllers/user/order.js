const Order = require("../../models/user/order");
const generateOrderConfirmationEmail = require("../../utils/emailmsg");
const { sendmail } = require("../../utils/nodemailer");

async function orderConform(req, res) {
  try {
    const { name, mo, email, address, city, zip, cartItem, subtotal, deliveryCharge, grandTotal } = req.body;

    const newOrder = new Order({
      name,
      mo,
      email,
      address,
      city,
      zip,
      cartItem: JSON.parse(cartItem),
      subtotal: parseFloat(subtotal),
      deliveryCharge: parseFloat(deliveryCharge),
      grandTotal: parseFloat(grandTotal)
    });

    const orderdata = await newOrder.save();
    const htmlEmail = generateOrderConfirmationEmail(orderdata);

    await sendmail(email, "Order Conformation", `Hi ${name}, thank you for your order.`, htmlEmail);

    res.render("ordersuccess", { order: orderdata });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).send("Error saving order");
  }
}
module.exports = orderConform;
