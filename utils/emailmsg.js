function generateOrderConfirmationEmail(order) {
  const { name, address, city, zip, cartItem, subtotal, deliveryCharge, grandTotal } = order;

  const itemsHtml = cartItem
    .map(
      item => `
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.qty}</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">₹${item.price.toFixed(2)}</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">₹${item.total.toFixed(2)}</td>
      </tr>
    `
    )
    .join("");

  return `
    <h2>Order Confirmation</h2>
    <p>Hi ${name},</p>
    <p>Thank you for your order. Here are your order details:</p>
    <h3>Shipping Address</h3>
    <p>${address},<br>${city} - ${zip}</p>
    <h3>Order Summary</h3>
    <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
      <thead>
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px;">Product</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Qty</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Price</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
        <tr>
          <td colspan="3" style="text-align: right; padding: 8px; border: 1px solid #ddd;"><strong>Subtotal</strong></td>
          <td style="text-align: right; padding: 8px; border: 1px solid #ddd;">₹${subtotal.toFixed(2)}</td>
        </tr>
        <tr>
          <td colspan="3" style="text-align: right; padding: 8px; border: 1px solid #ddd;"><strong>Delivery Charge</strong></td>
          <td style="text-align: right; padding: 8px; border: 1px solid #ddd;">₹${deliveryCharge.toFixed(2)}</td>
        </tr>
        <tr>
          <td colspan="3" style="text-align: right; padding: 8px; border: 1px solid #ddd;"><strong>Grand Total</strong></td>
          <td style="text-align: right; padding: 8px; border: 1px solid #ddd;">₹${grandTotal.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
    <p>If you have any questions, feel free to contact us.</p>
    <p>Thanks,<br>FOREVA</p>
  `;
}

module.exports = generateOrderConfirmationEmail;
