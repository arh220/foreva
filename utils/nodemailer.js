const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: "aradhana.webmigrates@gmail.com",
    pass: "ypbhsfrdakgaerry"
  }
});

async function sendmail(to, subject, text, html) {
  const info = await transporter.sendMail({
    from: '"Foreva" <aradhana.webmigrates@gmail.com>',
    to,
    subject,
    text,
    html
  });
}
module.exports = { sendmail };
