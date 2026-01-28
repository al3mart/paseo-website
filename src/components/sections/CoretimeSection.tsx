"use client";

import { InfoCard } from "@/components/shared/InfoCard";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CORETIME_CTA, CORETIME_STEPS } from "@/constants/coretime";
import { URLS } from "@/constants/urls";
import { ExternalLink } from "lucide-react";

export function CoretimeSection() {
	return (
		<Section className="pt-32">
			<SectionHeader
				title="How to Obtain Coretime in Paseo"
				description="Obtaining coretime in Paseo follows the same process as production networks. All extrinsics are called on the Coretime chain as part of the broker pallet."
			/>

			<div className="max-w-4xl mx-auto space-y-8">
				{CORETIME_STEPS.map((step) => (
					<InfoCard
						key={step.number}
						icon={step.icon}
						title={step.title}
						label={`Step ${step.number}`}
						description={step.content}
						note={step.note}
						layout="inline"
						className="hover:shadow-lg"
						footer={
							step.link && (
								<a
									href={step.link.url}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
								>
									{step.link.label}
									<ExternalLink className="w-4 h-4" />
								</a>
							)
						}
					/>
				))}

				<InfoCard
					icon={CORETIME_CTA.icon}
					title={CORETIME_CTA.title}
					description={CORETIME_CTA.description}
					layout="inline"
					className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent hover:shadow-lg"
					footer={
						<a
							href={URLS.regionXHub}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
						>
							{CORETIME_CTA.linkLabel}
							<ExternalLink className="w-4 h-4" />
						</a>
					}
				/>
			</div>
		</Section>
	);
}
