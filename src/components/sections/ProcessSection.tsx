import { Divider } from "@/components/ui/Divider";
import { Eyebrow } from "@/components/ui/Eyebrow";

const steps = [
	{
		body: "We identify the audience, offer, proof gaps, decision path, and measurable goals before layout work begins.",
		title: "Map the commercial job",
	},
	{
		body: "We create the information architecture, page structure, and interface system around the actions users need to take.",
		title: "Design the site system",
	},
	{
		body: "We build reusable sections, responsive states, and production details in Next.js with practical handoff notes.",
		title: "Develop the experience",
	},
	{
		body: "We review performance, accessibility, analytics, CMS readiness, and launch tasks before the site goes live.",
		title: "Prepare for launch",
	},
];

export function ProcessSection() {
	return (
		<section className="bg-[#F3F2EF] py-24 md:py-32" id="process">
			<div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-12">
				<div className="grid grid-cols-12 gap-x-6 gap-y-12">
					<div className="col-span-12 md:col-span-5">
						<Eyebrow>Process</Eyebrow>
						<h2 className="mb-4 font-display text-4xl font-semibold leading-[1.15] tracking-[-0.02em] text-[#0A0A0A]">
							A clear sequence keeps the build focused from first call to launch.
						</h2>
						<p className="max-w-[640px] font-sans text-base leading-[1.7] text-[#6B6B6B]">
							Every phase produces a decision, artifact, or shipped improvement. That keeps the project
							moving without turning the website into an open-ended redesign.
						</p>
					</div>

					<div className="col-span-12 md:col-span-7">
						{steps.map((step, index) => (
							<div className="border-t border-[#E2E1DE] py-6" key={step.title}>
								<div className="grid grid-cols-12 gap-6">
									<p className="col-span-12 font-sans text-sm font-medium text-[#6B6B6B] md:col-span-2">
										0{index + 1}
									</p>
									<div className="col-span-12 md:col-span-10">
										<h3 className="mb-2 font-display text-2xl font-semibold leading-[1.25] tracking-[-0.01em] text-[#0A0A0A]">
											{step.title}
										</h3>
										<p className="max-w-[640px] font-sans text-base leading-[1.7] text-[#6B6B6B]">
											{step.body}
										</p>
									</div>
								</div>
							</div>
						))}
						<Divider className="mb-0 mt-6" />
					</div>
				</div>
			</div>
		</section>
	);
}
