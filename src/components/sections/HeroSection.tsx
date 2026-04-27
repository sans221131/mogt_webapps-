import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Tag } from "@/components/ui/Tag";

const proofPoints = ["Strategy-first build", "Conversion-ready UX", "Launch support included"];

export function HeroSection() {
	return (
		<section className="bg-[#F9F8F6] pb-20 pt-24 md:pb-24 md:pt-32" id="home">
			<div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-12">
				<div className="mx-auto max-w-[920px] text-center">
					<Eyebrow>Web systems for service teams</Eyebrow>
					<h1 className="font-display text-[48px] font-bold leading-[1.08] tracking-[-0.03em] text-[#0A0A0A] md:text-[72px]">
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

				<div
					aria-label="A preview of a structured website project workspace with strategy, design, build, and launch stages"
					className="mt-16 rounded-lg border border-[#E2E1DE] bg-[#F3F2EF] p-6 md:p-8"
					role="img"
				>
					<div className="flex flex-col gap-6 border-b border-[#E2E1DE] pb-6 md:flex-row md:items-center md:justify-between">
						<div>
							<p className="font-sans text-xs font-medium uppercase tracking-[0.08em] text-[#6B6B6B]">
								Project workspace
							</p>
							<p className="mt-2 font-display text-2xl font-semibold leading-[1.25] tracking-[-0.01em] text-[#0A0A0A]">
								Clarity to launch in one system
							</p>
						</div>
						<div className="flex flex-wrap gap-2">
							<Tag>Positioning</Tag>
							<Tag>UX map</Tag>
							<Tag>Build plan</Tag>
						</div>
					</div>

					<div className="grid grid-cols-12 gap-6 pt-6">
						<div className="col-span-12 rounded-lg border border-[#E2E1DE] bg-[#F9F8F6] p-6 md:col-span-7">
							<div className="flex items-center justify-between gap-4">
								<p className="font-display text-lg font-medium text-[#0A0A0A]">Conversion path</p>
								<span className="font-sans text-xs font-medium text-[#6B6B6B]">72% mapped</span>
							</div>
							<div className="mt-6 space-y-4">
								{["Audience intent", "Service proof", "Lead capture"].map((label, index) => (
									<div className="grid grid-cols-12 items-center gap-3" key={label}>
										<p className="col-span-4 font-sans text-sm text-[#6B6B6B]">{label}</p>
										<div className="col-span-8 h-2 rounded-full bg-[#EBEBE8]">
											<div
												className="h-2 rounded-full bg-[#2563EB]"
												style={{ width: `${64 + index * 12}%` }}
											/>
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="col-span-12 rounded-lg border border-[#E2E1DE] bg-[#F9F8F6] p-6 md:col-span-5">
							<p className="font-display text-lg font-medium text-[#0A0A0A]">Launch sequence</p>
							<ol className="mt-6 space-y-4">
								{["Messaging audit", "Interface design", "Production handoff"].map((item, index) => (
									<li className="flex items-start gap-3" key={item}>
										<span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-[#C9C8C5] font-sans text-xs font-medium text-[#0A0A0A]">
											{index + 1}
										</span>
										<span className="font-sans text-sm leading-[1.6] tracking-[0.01em] text-[#6B6B6B]">
											{item}
										</span>
									</li>
								))}
							</ol>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
