import { FAQSection } from "@/components/sections/FAQSection";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { HeroSection } from "@/components/sections/HeroSection";
import { PricingEstimatorCTA } from "@/components/sections/PricingEstimatorCTA";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";

export default function Home() {
	return (
		<>
			<Nav />
			<main>
				<HeroSection />
				<ServicesOverview />
				<FeaturedWork />
				<ProcessSection />
				<WhyChooseUs />
				<PricingEstimatorCTA />
				<Testimonials />
				<FAQSection />
				<FinalCTA />
			</main>
			<Footer />
		</>
	);
}
