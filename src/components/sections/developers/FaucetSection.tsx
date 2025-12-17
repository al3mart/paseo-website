"use client";

import { FaucetCard } from "@/components/shared/FaucetCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DEVELOPERS_PAGE_CONTENT } from "@/constants/developers";
import { Droplets, ExternalLink, Sparkles } from "lucide-react";

export function FaucetSection() {
	return (
		<section id="faucet" className="section-primary py-24">
			<div className="max-w-7xl mx-auto px-6">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						{DEVELOPERS_PAGE_CONTENT.faucet.title}
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
						{DEVELOPERS_PAGE_CONTENT.faucet.description}
					</p>
				</div>

				<div className="grid gap-6 max-w-4xl mx-auto">
					{DEVELOPERS_PAGE_CONTENT.faucet.faucets.map((faucet) => (
						<FaucetCard
							key={faucet.name}
							icon={Droplets}
							title={faucet.name}
							subtitle={
								<div className="flex items-center gap-1 text-sm text-muted-foreground">
									<Sparkles className="w-3 h-3" />
									<span>Free testnet tokens</span>
								</div>
							}
							description={faucet.description}
							action={
								<Button asChild size="lg" className="group w-full md:w-auto">
									<a
										href={faucet.url}
										target="_blank"
										rel="noopener noreferrer"
									>
										<Droplets className="mr-2 h-5 w-5" />
										Get Test Tokens
										<ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
									</a>
								</Button>
							}
						>
							<div className="flex flex-wrap gap-2">
								{faucet.networks.map((network) => (
									<Badge key={network} variant="secondary" className="text-xs">
										{network}
									</Badge>
								))}
							</div>
						</FaucetCard>
					))}
				</div>
			</div>
		</section>
	);
}
