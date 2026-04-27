import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Tag } from "@/components/ui/Tag";
import HeroParticleField from "@/components/ui/HeroParticleField";
import ScrollHint from "@/components/ui/ScrollHint";

const proofPoints = ["Strategy-first build", "Conversion-ready UX", "Launch support included"];

export function HeroSection() {
	return (
		<section className="relative overflow-hidden bg-[#F9F8F6] min-h-[calc(100vh-64px)] flex items-center" id="home">
			<HeroParticleField />
			<div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10 lg:px-12 w-full">
				<div className="mx-auto max-w-[920px] text-center py-6 md:py-0">
					<Eyebrow>Web systems for service teams</Eyebrow>
					<h1
						className="font-display font-bold leading-[1.08] tracking-[-0.03em] text-[#0A0A0A]"
						style={{ fontSize: "clamp(36px, 6.5vw, 72px)" }}
					>
						MOGT builds websites that make service businesses easier to choose.
					</h1>
					<p className="mx-auto mt-6 max-w-[640px] font-sans text-base leading-[1.7] text-[#6B6B6B]">
						We turn positioning, user experience, and production-ready Next.js into focused websites that
						help qualified prospects understand your value and take the next step.
					</p>

					<div className="mt-10 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
						<Button href="#estimate">
							Plan a project
							<ArrowRight aria-hidden="true" className="ml-2 size-4" strokeWidth={1.5} />
						</Button>
						<Button href="#work" variant="secondary">
							View work
						</Button>
					</div>

					<div className="mt-8 flex flex-wrap justify-center gap-2">
						{proofPoints.map((point) => (
							<Tag key={point}>
								<CheckCircle2 aria-hidden="true" className="mr-2 size-3" strokeWidth={1.5} />
								{point}
							</Tag>
						))}
					</div>
				</div>

				<ScrollHint href="#services" />

					{/* Project preview box removed per request */}
			</div>
		</section>
	);
}
