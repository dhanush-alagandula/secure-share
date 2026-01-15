const nodemailer = require('nodemailer');

async function sendEmail({ from, to, subject, text, html }) {
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let info = await transporter.sendMail({
        from,
        to,
        subject,
        text,
        html
    });

}

module.exports = sendEmail;