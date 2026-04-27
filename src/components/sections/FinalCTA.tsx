import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function FinalCTA() {
	return (
		<section className="bg-[#F3F2EF] py-24 md:py-32">
			<div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-12">
				<div className="mx-auto max-w-[760px] text-center">
					<Eyebrow>Next step</Eyebrow>
					<h2 className="mb-4 font-display text-4xl font-semibold leading-[1.15] tracking-[-0.02em] text-[#0A0A0A]">
						Bring the current site, the goal, and the constraints. We will help shape the first useful
						version.
					</h2>
					<p className="mx-auto mb-10 max-w-[640px] font-sans text-base leading-[1.7] text-[#6B6B6B]">
						Start with a short estimate request and get a practical recommendation on scope, timeline, and
						priority pages.
					</p>
					<div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
						<Button href="mailto:hello@mogt.studio?subject=New%20website%20project">
							Start a project
							<ArrowRight aria-hidden="true" className="ml-2 size-4" strokeWidth={1.5} />
						</Button>
						<Button href="#services" variant="secondary">
							Review services
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
