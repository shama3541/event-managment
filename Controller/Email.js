// utils/mailer.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.EMAIL_USER,       
    pass: process.env.EMAIL_PASSWORD,  
  },
});

async function sendRegistrationEmail(to, username) {
  const info = await transporter.sendMail({
    from: `"EventApp" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Welcome to EventApp 🎉",
    text: `Hi ${username},\n\nThanks for registering at EventApp! We're excited to have you on board.`,
  });

  console.log("Email sent: ", info.messageId);
}

module.exports = { sendRegistrationEmail };
