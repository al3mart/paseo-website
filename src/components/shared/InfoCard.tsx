"use client";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InfoCardProps {
	icon: LucideIcon;
	title: string;
	description?: string;
	/** Content rendered next to the title (e.g., badges) */
	headerExtra?: ReactNode;
	/** Content rendered at the bottom of the card (e.g., buttons, selects) */
	footer?: ReactNode;
	className?: string;
	/** Icon container size variant */
	iconSize?: "sm" | "md";
	/** Layout variant: "stacked" puts icon above title, "inline" puts them side by side */
	layout?: "stacked" | "inline";
}

export function InfoCard({
	icon: Icon,
	title,
	description,
	headerExtra,
	footer,
	className,
	iconSize = "md",
	layout = "stacked",
}: InfoCardProps) {
	const iconContainerClasses = cn(
		"bg-primary/10 rounded-xl flex items-center justify-center",
		iconSize === "sm" ? "w-10 h-10" : "w-12 h-12",
	);

	const iconClasses = cn(
		"text-primary",
		iconSize === "sm" ? "w-5 h-5" : "w-6 h-6",
	);

	return (
		<div
			className={cn(
				"bg-card p-5 rounded-2xl border border-border hover:border-primary/50 transition-all duration-200",
				className,
			)}
		>
			{layout === "stacked" ? (
				<>
					<div className={cn(iconContainerClasses, "mb-4")}>
						<Icon className={iconClasses} />
					</div>
					<h3 className="text-lg font-semibold mb-2">{title}</h3>
				</>
			) : (
				<div className="flex items-start gap-3 mb-4">
					<div className={iconContainerClasses}>
						<Icon className={iconClasses} />
					</div>
					<div className="flex-1 min-w-0">
						<h3 className="font-semibold">{title}</h3>
						{headerExtra}
					</div>
				</div>
			)}

			{description && (
				<p className="text-muted-foreground text-sm mb-4">{description}</p>
			)}

			{footer}
		</div>
	);
}
