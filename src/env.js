import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	/**
	 * Specify your server-side environment variables schema here. This way you can ensure the app
	 * isn't built with invalid env vars.
	 */
	server: {
		AUTH_SECRET: process.env.NODE_ENV === "production" ? z.string() : z.string().optional(),

		SALT_ROUNDS: z.number().optional().default(10),
		DATABASE_URL: z.string().url(),
		NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

		// Email configuration
		SMTP_HOST: z.string().default("smtp.gmail.com"),
		SMTP_PORT: z.number().default(465),
		SMTP_USER: z.string(),
		SMTP_PASS: z.string(),
		FROM_EMAIL: z.string().email(),
		FROM_NAME: z.string().default("StuMate"),
	},

	/**
	 * Specify your client-side environment variables schema here. This way you can ensure the app
	 * isn't built with invalid env vars. To expose them to the client, prefix them with
	 * `NEXT_PUBLIC_`.
	 */
	client: {
		NEXT_PUBLIC_API_URL: z.string().url().default("http://localhost:3000/api"),
		NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
	},

	/**
	 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
	 * middlewares) or client-side so we need to destruct manually.
	 */
	runtimeEnv: {
		AUTH_SECRET: process.env.AUTH_SECRET,
		SALT_ROUNDS: process.env.SALT_ROUNDS ? Number(process.env.SALT_ROUNDS) : 10,
		DATABASE_URL: process.env.DATABASE_URL,
		NODE_ENV: process.env.NODE_ENV,
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
		NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,

		// Email configuration
		SMTP_HOST: process.env.SMTP_HOST,
		SMTP_PORT: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465,
		SMTP_USER: process.env.SMTP_USER,
		SMTP_PASS: process.env.SMTP_PASS,
		FROM_EMAIL: process.env.FROM_EMAIL,
		FROM_NAME: process.env.FROM_NAME,
	},
	/**
	 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
	 * useful for Docker builds.
	 */
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
	/**
	 * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
	 * `SOME_VAR=''` will throw an error.
	 */
	emptyStringAsUndefined: true,
});
