"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signOut, useSession } from "~/lib/auth-client";

export default function DashboardPage() {
	const { data: session, isPending } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (!isPending && !session) {
			router.push("/sign-in");
		}
	}, [session, isPending, router]);

	if (isPending) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-center">
					<div className="mx-auto h-32 w-32 animate-spin rounded-full border-primary border-b-2"></div>
					<p className="mt-4 text-muted-foreground">Loading...</p>
				</div>
			</div>
		);
	}

	if (!session) {
		return null; // Will redirect
	}

	const handleSignOut = async () => {
		await signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/sign-in");
				},
			},
		});
	};

	return (
		<div className="min-h-screen bg-background">
			<main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
				<div className="px-4 py-6 sm:px-0">
					<div className="rounded-lg border-4 border-border border-dashed p-8">
						<div className="text-center">
							<h2 className="mb-4 font-semibold text-2xl text-foreground">Welcome to StuMate</h2>
							<p className="mb-6 text-muted-foreground">
								Your student management dashboard. Features coming soon!
							</p>
							<div className="rounded-lg border border-border bg-card p-6 shadow-sm">
								<h3 className="mb-2 font-medium text-card-foreground text-lg">User Information</h3>
								<div className="text-muted-foreground text-sm">
									<p>
										<strong>Name:</strong> {session.user?.name}
									</p>
									<p>
										<strong>Email:</strong> {session.user?.email}
									</p>
									<p>
										<strong>ID:</strong> {session.user?.id}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
