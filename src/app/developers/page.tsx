import { FloatingNav } from "@/components/layouts/FloatingNav";
import { Footer } from "@/components/layouts/Footer";
import { ChainSpecsSection } from "@/components/sections/ChainSpecsSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import {
	DevelopersHeroSection,
	FaucetSection,
	RpcEndpointsSection,
} from "@/components/sections/developers";
import { ResourcesSection } from "@/components/sections/ResourcesSection";

export const metadata = {
	title: "Developers | Paseo Testnet",
	description:
		"Developer portal for Paseo testnet. Access RPC endpoints, chain specs, and documentation for building on Polkadot's testnet.",
};

export default function DevelopersPage() {
	return (
		<div className="min-h-screen bg-background text-foreground">
			<FloatingNav />
			<DevelopersHeroSection />
			<FaucetSection />
			<RpcEndpointsSection />
			<ChainSpecsSection />
			<ComparisonSection />
			<ResourcesSection />
			<Footer />
		</div>
	);
}
