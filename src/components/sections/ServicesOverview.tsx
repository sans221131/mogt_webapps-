import type { LucideIcon } from "lucide-react";
import { Code, Gauge, PenTool, Search } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";

const services: Array<{
	description: string;
	icon: LucideIcon;
	title: string;
}> = [
	{
		description:
			"Clarify your offer, audience priorities, conversion goals, and content hierarchy before design starts.",
		icon: Search,
		title: "Strategy and positioning",
	},
	{
		description:
			"Design clean page systems, reusable patterns, and high-trust user journeys that reduce decision friction.",
		icon: PenTool,
		title: "UX and interface design",
	},
	{
		description:
			"Build fast, maintainable Next.js pages with responsive layouts and practical content structures.",
		icon: Code,
		title: "Production development",
	},
	{
		description:
			"Improve speed, accessibility, analytics readiness, and conversion points before and after launch.",
		icon: Gauge,
		title: "Optimization support",
	},
];

export function ServicesOverview() {
	return (
		<section className="bg-[#F3F2EF] py-24 md:py-32" id="services">
			<div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-12">
				<div className="max-w-[640px]">
					<Eyebrow>Services</Eyebrow>
					<h2 className="mb-4 font-display text-4xl font-semibold leading-[1.15] tracking-[-0.02em] text-[#0A0A0A]">
						Everything required to make the website useful, credible, and shippable.
					</h2>
					<p className="mb-12 font-sans text-base leading-[1.7] text-[#6B6B6B]">
						We keep the scope tight around the work that affects user understanding, lead quality, and launch
						reliability.
					</p>
				</div>

				<div className="grid grid-cols-12 gap-6">
					{services.map((service) => {
						const Icon = service.icon;

						return (
							<Card className="col-span-12 md:col-span-6" key={service.title}>
								<Icon aria-hidden="true" className="mb-4 size-8 text-[#0A0A0A]" strokeWidth={1.5} />
								<h3 className="mb-2 font-display text-2xl font-semibold leading-[1.25] tracking-[-0.01em] text-[#0A0A0A]">
									{service.title}
								</h3>
								<p className="font-sans text-base leading-[1.7] text-[#6B6B6B]">{service.description}</p>
							</Card>
						);
					})}
				</div>
			</div>
		</section>
	);
}
