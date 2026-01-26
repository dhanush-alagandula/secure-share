const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: "apikey",
        pass: process.env.EMAIL_PASS
    }
});

async function sendEmail({ to, subject, html }) {
    await transporter.sendMail({
        from: "Secure Share <qz77120@gmail.com>",
        to,
        subject,
        html
    });
}

module.exports = sendEmail;
