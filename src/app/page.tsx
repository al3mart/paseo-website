import { FloatingNav } from "@/components/layouts/FloatingNav";
import { Footer } from "@/components/layouts/Footer";
import { AboutSection } from "@/components/sections/AboutSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { LogoSection } from "@/components/sections/LogoSection";
import { UsersSection } from "@/components/sections/UsersSection";

export default function Home() {
	return (
		<div className="min-h-screen bg-background text-foreground">
			<FloatingNav />
			<HeroSection />
			<AboutSection />
			<UsersSection />
			<FeaturesSection />
			<LogoSection />
			<FAQSection />
			<Footer />
		</div>
	);
}
