import { FloatingNav } from "@/components/layouts/FloatingNav";
import { Footer } from "@/components/layouts/Footer";
import { CoretimeSection } from "@/components/sections/CoretimeSection";

export const metadata = {
	title: "How to Obtain Coretime | Paseo Testnet",
	description:
		"Learn how to obtain, assign, and manage coretime for your parachain on Paseo testnet.",
};

export default function CoretimePage() {
	return (
		<div className="min-h-screen bg-background text-foreground">
			<FloatingNav />
			<CoretimeSection />
			<Footer />
		</div>
	);
}
