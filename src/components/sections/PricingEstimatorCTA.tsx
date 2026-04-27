import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

const ranges = [
	{ label: "Focused landing page", value: "$4k to $7k" },
	{ label: "Service website", value: "$9k to $18k" },
	{ label: "Growth system", value: "$20k+" },
];

export function PricingEstimatorCTA() {
	return (
		<section className="bg-[#0A0A0A] py-24 md:py-32" id="estimate">
			<div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-12">
				<div className="grid grid-cols-12 gap-x-6 gap-y-12">
					<div className="col-span-12 md:col-span-7">
						<Eyebrow className="text-[#9A9A9A]">Pricing estimator</Eyebrow>
						<h2 className="mb-4 font-display text-4xl font-semibold leading-[1.15] tracking-[-0.02em] text-[#F9F8F6]">
							Start with a realistic scope before committing to a build.
						</h2>
						<p className="mb-10 max-w-[640px] font-sans text-base leading-[1.7] text-[#9A9A9A]">
							Send the basics: business type, page count, timeline, and the commercial goal. We will return
							a practical estimate range and the smallest sensible first version.
						</p>
						<Button href="mailto:hello@mogt.studio?subject=Project%20estimate" variant="inverse">
							Request an estimate
							<ArrowRight aria-hidden="true" className="ml-2 size-4" strokeWidth={1.5} />
						</Button>
					</div>

					<div className="col-span-12 md:col-span-5">
						<div className="rounded-lg border border-[#F9F8F6]/10 p-6 md:p-8">
							<p className="font-sans text-xs font-medium uppercase tracking-[0.08em] text-[#9A9A9A]">
								Common ranges
							</p>
							<div className="mt-6 space-y-4">
								{ranges.map((range) => (
									<div
										className="flex items-center justify-between gap-6 border-t border-[#F9F8F6]/10 pt-4"
										key={range.label}
									>
										<p className="font-sans text-sm leading-[1.6] tracking-[0.01em] text-[#9A9A9A]">
											{range.label}
										</p>
										<p className="font-display text-lg font-medium text-[#F9F8F6]">{range.value}</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
