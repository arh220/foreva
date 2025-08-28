const Order = require("../../models/user/order");
async function allorders(req, res) {
  await Order.find();
  
}
module.exports = allorders;
