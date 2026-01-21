"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface InfoCardProps {
	icon: LucideIcon;
	title: string;
	/** Single description or multiple paragraphs */
	description?: string | readonly string[];
	/** Label displayed above the title (e.g., "Step 1") */
	label?: string;
	/** Note displayed at the bottom of the content with special styling */
	note?: string;
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
	label,
	note,
	headerExtra,
	footer,
	className,
	iconSize = "md",
	layout = "stacked",
}: InfoCardProps) {
	const descriptionArray = Array.isArray(description)
		? description
		: description
			? [description]
			: [];
	const iconContainerClasses = cn(
		"bg-primary/10 flex items-center justify-center transition-colors group-hover:bg-primary/20 rounded-xl",
		iconSize === "sm" ? "w-10 h-10" : "w-12 h-12",
	);

	const iconClasses = cn(
		"text-primary",
		iconSize === "sm" ? "w-5 h-5" : "w-6 h-6",
	);

	return (
		<div
			className={cn(
				"group bg-card p-5 rounded-2xl border border-border hover:border-primary/50 transition-all duration-200",
				className,
			)}
		>
			{layout === "stacked" ? (
				<>
					<div className={cn(iconContainerClasses, "mb-4")}>
						<Icon className={iconClasses} />
					</div>
					{label && (
						<p className="text-sm font-medium text-muted-foreground mb-1">
							{label}
						</p>
					)}
					<h3 className="text-lg font-semibold mb-2">{title}</h3>
				</>
			) : (
				<div className="flex items-start gap-4 mb-4">
					<div className={iconContainerClasses}>
						<Icon className={iconClasses} />
					</div>
					<div className="flex-1 min-w-0">
						{label && (
							<p className="text-sm font-medium text-muted-foreground">
								{label}
							</p>
						)}
						<h3 className="text-xl font-semibold">{title}</h3>
						{headerExtra}
					</div>
				</div>
			)}

			{descriptionArray.length > 0 && (
				<div className={descriptionArray.length > 1 ? "space-y-4" : ""}>
					{descriptionArray.map((paragraph, idx) => (
						<p key={idx} className="text-muted-foreground leading-relaxed">
							{paragraph}
						</p>
					))}
				</div>
			)}

			{note && (
				<div className="mt-4 p-4 rounded-lg bg-muted/50 border border-border">
					<p className="text-sm text-muted-foreground">
						<span className="font-semibold text-foreground">Note: </span>
						{note}
					</p>
				</div>
			)}

			{footer && <div className="mt-4">{footer}</div>}
		</div>
	);
}
