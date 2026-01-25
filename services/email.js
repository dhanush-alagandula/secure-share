const nodemailer = require('nodemailer');

async function sendEmail({ from, to, subject, text, html }) {
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        connectionTimeout: 10000, // 10 seconds
        greetingTimeout: 10000, // 10 seconds
        socketTimeout: 10000 // 10 seconds
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