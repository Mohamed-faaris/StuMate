"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { signUp } from "~/lib/auth-client";

export default function RegisterPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [name, setName] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		if (password.length < 6) {
			setError("Password must be at least 6 characters");
			return;
		}

		setLoading(true);

		try {
			// First, sign up with email and password
			const signUpResult = await signUp.email(
				{
					email,
					password,
					name,
					callbackURL: "/",
				},
				{
					onRequest: () => {
						setLoading(true);
					},
					onSuccess: async () => {
						router.push("/");
					},
					onError: (ctx) => {
						setError(ctx.error.message || "Registration failed");
					},
				},
			);
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-center text-2xl">Create your account</CardTitle>
					<CardDescription className="text-center">
						Enter your information to create your account
					</CardDescription>
				</CardHeader>

				<CardContent className="space-y-4">
					{error && (
						<div className="rounded-md bg-destructive/10 p-4">
							<p className="font-medium text-destructive text-sm">{error}</p>
						</div>
					)}

					<form className="space-y-4" onSubmit={handleRegister}>
						<div className="space-y-2">
							<label htmlFor="name" className="font-medium text-foreground text-sm">
								Full Name
							</label>
							<input
								id="name"
								name="name"
								type="text"
								autoComplete="name"
								required
								className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground text-sm placeholder-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
								placeholder="Full Name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								disabled={loading}
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor="email-address" className="font-medium text-foreground text-sm">
								Email address
							</label>
							<input
								id="email-address"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground text-sm placeholder-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
								placeholder="Email address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								disabled={loading}
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor="password" className="font-medium text-foreground text-sm">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="new-password"
								required
								className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground text-sm placeholder-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
								placeholder="Password (min. 6 characters)"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								disabled={loading}
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor="confirm-password" className="font-medium text-foreground text-sm">
								Confirm Password
							</label>
							<input
								id="confirm-password"
								name="confirmPassword"
								type="password"
								autoComplete="new-password"
								required
								className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground text-sm placeholder-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
								placeholder="Confirm Password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								disabled={loading}
							/>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
						>
							{loading ? "Creating account..." : "Sign up"}
						</button>
					</form>
				</CardContent>

				<CardFooter>
					<p className="w-full text-center text-muted-foreground text-sm">
						Already have an account?{" "}
						<Link
							href="/sign-in"
							className="font-medium text-primary underline underline-offset-4 hover:text-primary/90"
						>
							Sign in
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
