import nodemailer from "nodemailer";
import { env } from "~/env";

export const transporter = nodemailer.createTransporter({
	host: env.SMTP_HOST,
	port: env.SMTP_PORT,
	secure: env.SMTP_PORT === 465, // true for 465, false for other ports
	auth: {
		user: env.SMTP_USER,
		pass: env.SMTP_PASS,
	},
});

export interface EmailOptions {
	to: string;
	subject: string;
	html: string;
	text?: string;
	from?: string;
}

export async function sendEmail(options: EmailOptions) {
	try {
		const mailOptions = {
			from: options.from || `"${env.FROM_NAME}" <${env.FROM_EMAIL}>`,
			to: options.to,
			subject: options.subject,
			html: options.html,
			text: options.text,
		};

		const info = await transporter.sendMail(mailOptions);
		console.log("Email sent successfully:", info.messageId);
		return { success: true, messageId: info.messageId };
	} catch (error) {
		console.error("Error sending email:", error);
		throw new Error("Failed to send email");
	}
}
