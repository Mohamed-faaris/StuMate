import { sendEmail } from "./config";
import { renderTemplate } from "./templates";

export interface WelcomeEmailData {
	name: string;
	email: string;
	dashboardUrl: string;
}

export interface PasswordResetEmailData {
	name: string;
	email: string;
	resetUrl: string;
	expiryHours: number;
}

export interface EmailVerificationData {
	name: string;
	email: string;
	verificationUrl?: string;
	verificationCode?: string;
	expiryHours: number;
}

export async function sendWelcomeEmail(data: WelcomeEmailData) {
	const { html, text } = renderTemplate("welcome", data as unknown as Record<string, unknown>);

	return sendEmail({
		to: data.email,
		subject: "Welcome to StuMate! 🎓",
		html,
		text,
	});
}

export async function sendPasswordResetEmail(data: PasswordResetEmailData) {
	const { html, text } = renderTemplate(
		"password-reset",
		data as unknown as Record<string, unknown>,
	);

	return sendEmail({
		to: data.email,
		subject: "Reset Your StuMate Password",
		html,
		text,
	});
}

export async function sendEmailVerification(data: EmailVerificationData) {
	const { html, text } = renderTemplate(
		"email-verification",
		data as unknown as Record<string, unknown>,
	);

	return sendEmail({
		to: data.email,
		subject: "Verify Your StuMate Email",
		html,
		text,
	});
} // Generic email sending function for custom templates
export async function sendTemplateEmail(
	to: string,
	subject: string,
	templateName: string,
	templateData: Record<string, unknown>,
) {
	const { html, text } = renderTemplate(templateName, templateData);

	return sendEmail({
		to,
		subject,
		html,
		text,
	});
}
