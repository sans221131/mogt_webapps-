import type { LucideIcon } from "lucide-react";
import { BadgeCheck, Clock, LineChart, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";

const reasons: Array<{
	body: string;
	icon: LucideIcon;
	title: string;
}> = [
	{
		body: "Decisions are tied to audience intent, offer clarity, and measurable business outcomes.",
		icon: BadgeCheck,
		title: "Commercial clarity",
	},
	{
		body: "Designs are composed from reusable section patterns that stay consistent as the site grows.",
		icon: ShieldCheck,
		title: "System discipline",
	},
	{
		body: "Builds prioritize performance, accessibility, responsive polish, and practical maintenance.",
		icon: Clock,
		title: "Production focus",
	},
	{
		body: "Launch plans include analytics events, inquiry flows, and the first optimization priorities.",
		icon: LineChart,
		title: "Post-launch learning",
	},
];

export function WhyChooseUs() {
	return (
		<section className="bg-[#F9F8F6] py-24 md:py-32">
			<div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-12">
				<div className="max-w-[640px]">
					<Eyebrow>Why choose us</Eyebrow>
					<h2 className="mb-4 font-display text-4xl font-semibold leading-[1.15] tracking-[-0.02em] text-[#0A0A0A]">
						Built for teams that need a website to do a job, not just look finished.
					</h2>
					<p className="mb-12 font-sans text-base leading-[1.7] text-[#6B6B6B]">
						The work is intentionally narrow: make the offer easier to understand, make the interface easier
						to navigate, and make the site easier to improve.
					</p>
				</div>

				<div className="grid grid-cols-12 gap-6">
					{reasons.map((reason) => {
						const Icon = reason.icon;

						return (
							<Card className="col-span-12 md:col-span-6" key={reason.title}>
								<Icon aria-hidden="true" className="mb-4 size-8 text-[#0A0A0A]" strokeWidth={1.5} />
								<h3 className="mb-2 font-display text-2xl font-semibold leading-[1.25] tracking-[-0.01em] text-[#0A0A0A]">
									{reason.title}
								</h3>
								<p className="font-sans text-base leading-[1.7] text-[#6B6B6B]">{reason.body}</p>
							</Card>
						);
					})}
				</div>
			</div>
		</section>
	);
}
