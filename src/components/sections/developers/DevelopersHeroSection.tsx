"use client";

import { Hero } from "@/components/shared/Hero";
import { PrimaryButton } from "@/components/shared/PrimaryButton";
import { SecondaryButton } from "@/components/shared/SecondaryButton";
import { Badge } from "@/components/ui/badge";
import { DEVELOPERS_PAGE_CONTENT } from "@/constants/developers";
import { URLS } from "@/constants/urls";
import { Code2, ExternalLink, FileText } from "lucide-react";

export function DevelopersHeroSection() {
	return (
		<Hero
			title={DEVELOPERS_PAGE_CONTENT.hero.title}
			description={DEVELOPERS_PAGE_CONTENT.hero.description}
			logoSize={120}
			badge={
				<Badge variant="secondary" className="mb-6">
					<Code2 className="w-3 h-3 mr-1" />
					{DEVELOPERS_PAGE_CONTENT.hero.badge}
				</Badge>
			}
			actions={
				<>
					<PrimaryButton
						className="group"
						onClick={() => {
							const rpcEndpointsSection =
								document.getElementById("rpc-endpoints");
							if (rpcEndpointsSection) {
								rpcEndpointsSection.scrollIntoView({ behavior: "smooth" });
							}
						}}
					>
						RPC Endpoints
					</PrimaryButton>
					<SecondaryButton
						className="group"
						onClick={() => window.open(URLS.docs, "_blank")}
					>
						<FileText className="mr-2 h-4 w-4" />
						Documentation
						<ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
					</SecondaryButton>
				</>
			}
		/>
	);
}
