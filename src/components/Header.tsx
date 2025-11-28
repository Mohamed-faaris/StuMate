"use client";

import { AnimatedThemeToggle } from "./ui/animated-theme-toggle";

export function Header() {
	return (
		<div className="fixed top-4 right-4 z-50">
			<AnimatedThemeToggle />
		</div>
	);
}
