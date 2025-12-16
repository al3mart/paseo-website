"use client";

import { Logo } from "@/components/shared/Logo";
import { cn } from "@/lib/utils";

interface HeroProps {
	id?: string;
	badge?: React.ReactNode;
	title: string;
	description: string;
	actions: React.ReactNode;
	footer?: React.ReactNode;
	logoSize?: number;
	className?: string;
}

export function Hero({
	id = "hero",
	badge,
	title,
	description,
	actions,
	footer,
	logoSize = 160,
	className,
}: HeroProps) {
	return (
		<section
			id={id}
			className={cn(
				"section-primary relative pt-16 md:pt-24 pb-32 md:pb-24 min-h-[100dvh] flex items-center justify-center overflow-hidden",
				className,
			)}
		>
			<div className="max-w-7xl mx-auto px-6 text-center">
				<div className="mb-8">
					{badge}
					<div className="flex justify-center mb-8">
						<Logo
							className="animate-float"
							width={logoSize}
							height={logoSize}
						/>
					</div>
					<h1 className="text-4xl md:text-5xl mb-6 font-bold">{title}</h1>
					<p className="text-xl opacity-80 max-w-3xl mx-auto">{description}</p>
				</div>

				<div className="flex flex-row gap-4 justify-center mb-16">
					{actions}
				</div>

				{footer}
			</div>
		</section>
	);
}
