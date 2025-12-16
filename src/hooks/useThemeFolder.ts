"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";

/**
 * Hook to get the current theme folder ("dark" | "light")
 * Handles SSR hydration by returning "light" on server and first render
 * to avoid hydration mismatch, then updating to the actual theme
 */
export function useThemeFolder(): "dark" | "light" {
	const { resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	// Always return "light" on server and first client render to avoid hydration mismatch
	if (!mounted) {
		return "light";
	}

	return resolvedTheme ?? "light";
}
