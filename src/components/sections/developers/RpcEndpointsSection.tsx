"use client";

import { CopyButton } from "@/components/shared/CopyButton";
import { InfoCard } from "@/components/shared/InfoCard";
import {
	ResourceDetailsModal,
	type ResourceDetailsData,
} from "@/components/shared/ResourceDetailsModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DEVELOPERS_PAGE_CONTENT } from "@/constants/developers";
import { Server } from "lucide-react";
import { useState } from "react";

interface SelectedChain {
	name: string;
	network: string;
	endpoints: readonly { provider: string; urls: readonly string[] }[];
}

export function RpcEndpointsSection() {
	const [selectedChain, setSelectedChain] = useState<SelectedChain | null>(
		null,
	);

	const getModalData = (chain: SelectedChain): ResourceDetailsData => ({
		sections: [
			{
				fields: chain.endpoints.map((endpoint) => ({
					label: endpoint.provider,
					value: endpoint.urls,
					type: "copyable" as const,
				})),
			},
		],
	});

	return (
		<section id="rpc-endpoints" className="section-secondary py-24">
			<div className="max-w-7xl mx-auto px-6">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						{DEVELOPERS_PAGE_CONTENT.rpcEndpoints.title}
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
						{DEVELOPERS_PAGE_CONTENT.rpcEndpoints.description}
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
					{DEVELOPERS_PAGE_CONTENT.rpcEndpoints.chains.map((chain) => {
						const primaryEndpoint = chain.endpoints[0];
						const totalUrls = chain.endpoints.reduce(
							(sum, endpoint) => sum + endpoint.urls.length,
							0,
						);
						const remainingUrls = totalUrls - 1;

						return (
							<InfoCard
								key={chain.network}
								icon={Server}
								title={chain.name}
								iconSize="sm"
								layout="inline"
								headerExtra={
									<Badge variant="outline" className="text-xs mt-1">
										{totalUrls} endpoint
										{totalUrls > 1 ? "s" : ""}
									</Badge>
								}
								footer={
									<>
										<div className="flex items-center gap-2 mb-3">
											<div className="flex-1 min-w-0">
												<code className="block text-xs bg-background/50 px-3 py-2 rounded-lg text-primary truncate font-mono">
													{primaryEndpoint.urls[0]}
												</code>
											</div>
											<CopyButton value={primaryEndpoint.urls[0]} />
										</div>

										{remainingUrls > 0 && (
											<Button
												variant="ghost"
												size="sm"
												onClick={() => setSelectedChain(chain)}
												className="w-full text-xs text-muted-foreground hover:text-foreground"
											>
												View {remainingUrls} more endpoint
												{remainingUrls > 1 ? "s" : ""}
											</Button>
										)}
									</>
								}
							/>
						);
					})}
				</div>
			</div>

			{selectedChain && (
				<ResourceDetailsModal
					isOpen={!!selectedChain}
					onClose={() => setSelectedChain(null)}
					title={`${selectedChain.name} RPC Endpoints`}
					data={getModalData(selectedChain)}
				/>
			)}
		</section>
	);
}
