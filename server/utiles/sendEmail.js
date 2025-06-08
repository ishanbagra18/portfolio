import nodeMailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendEmail = async ({ email, subject, message }) => {
    const transporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false, // Set to "false" for TLS (587)
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false, // Prevents SSL certificate issues
        },
    });

    const option = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject,
        html: message,
    };

    try {
        let info = await transporter.sendMail(option);
        console.log("Email sent:", info.response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
