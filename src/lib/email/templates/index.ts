import fs from "node:fs";
import path from "node:path";
import Handlebars from "handlebars";

const templatesDir = path.join(process.cwd(), "src/lib/email/templates");

export function compileTemplate(templateName: string, data: Record<string, unknown>): string {
	const templatePath = path.join(templatesDir, `${templateName}.hbs`);

	if (!fs.existsSync(templatePath)) {
		throw new Error(`Template ${templateName} not found`);
	}

	const templateSource = fs.readFileSync(templatePath, "utf8");
	const template = Handlebars.compile(templateSource);

	return template(data);
}

export function renderTemplate(
	templateName: string,
	data: Record<string, unknown>,
): { html: string; text: string } {
	const html = compileTemplate(templateName, data);

	// For text version, we can create a simple text version or use html-to-text library
	// For now, we'll just return the HTML and a basic text fallback
	const text = `Please view this email in HTML format. If you're seeing this, your email client doesn't support HTML emails.`;

	return { html, text };
}
