"use client";

import { ExternalLink, FileText } from "lucide-react";
import { Hero } from "@/components/shared/Hero";
import { PrimaryButton } from "@/components/shared/PrimaryButton";
import { SecondaryButton } from "@/components/shared/SecondaryButton";
import { StatCard } from "@/components/shared/StatCard";
import { HERO_CONTENT } from "@/constants/content";
import { HERO_STATS } from "@/constants/stats";

export function HeroSection() {
	return (
		<Hero
			title={HERO_CONTENT.title}
			description={HERO_CONTENT.description}
			actions={
				<>
					<PrimaryButton
						className="group"
						onClick={() => {
							const aboutSection = document.getElementById("about");
							if (aboutSection) {
								aboutSection.scrollIntoView({ behavior: "smooth" });
							}
						}}
					>
						Learn More
					</PrimaryButton>
					<SecondaryButton
						className="group"
						onClick={() =>
							window.open("https://github.com/paseo-network", "_blank")
						}
					>
						<FileText className="mr-2 h-4 w-4" />
						Documentation
						<ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
					</SecondaryButton>
				</>
			}
			footer={
				<div className="grid grid-cols-3 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
					{HERO_STATS.map((stat) => (
						<StatCard key={stat.label} value={stat.value} label={stat.label} />
					))}
				</div>
			}
		/>
	);
}
