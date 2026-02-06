const emailjs = require('@emailjs/nodejs');

async function sendEmail({ to, emailFrom, downloadLink, size, expires, fileName }) {
    try {
        const templateParams = {
            website_link: process.env.APP_BASE_URL,
            sender_email: emailFrom,
            file_name: fileName,
            file_size: size,
            expiry_time: expires,
            download_link: downloadLink,
            secure_share: process.env.APP_BASE_URL,
            receiver_email: to
        };

        const result = await emailjs.send(
            process.env.EMAILJS_SERVICE_ID,
            process.env.EMAILJS_TEMPLATE_ID,
            templateParams,
            {
                publicKey: process.env.EMAILJS_PUBLIC_KEY,
                privateKey: process.env.EMAILJS_PRIVATE_KEY
            }
        );

        console.log('Email sent successfully:', result);
    } catch (error) {
        console.error('EmailJS error details:', error);
        throw new Error(`Failed to send email via EmailJS: ${error.message || error}`);
    }
}

module.exports = sendEmail;
