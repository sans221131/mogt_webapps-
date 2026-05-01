"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
	Activity,
	Binary,
	Blocks,
	Gauge,
	ShieldCheck,
	Workflow,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type {
	Industry,
	ServicePageContent,
	Solution,
} from "@/components/layout/megaMenuData.rich";
import { Button } from "@/components/ui/Button";

type ServiceDetailPageProps = {
	industry: Industry;
	page: ServicePageContent;
	relatedSolutions: Solution[];
	solution: Solution;
};

type SectionId = "overview" | "features" | "needs" | "faq";

const sectionOrder: SectionId[] = ["overview", "features", "needs", "faq"];

const sectionLabels: Record<SectionId, string> = {
	overview: "Overview",
	features: "Key Features",
	needs: "When You Need This",
	faq: "Frequently Asked",
};

const featureIcons = [Blocks, Binary, ShieldCheck, Gauge, Workflow, Activity];

function FadeIn({
	children,
	className = "",
	delay = 0,
}: {
	children: React.ReactNode;
	className?: string;
	delay?: number;
}) {
	const reducedMotion = useReducedMotion();

	return (
		<motion.div
			className={className}
			initial={reducedMotion ? false : { opacity: 0, y: 20 }}
			transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
			viewport={{ amount: 0.16, once: true }}
			whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
		>
			{children}
		</motion.div>
	);
}

function SectionTitle({
	title,
	subtitle,
}: {
	title: string;
	subtitle?: string;
}) {
	return (
		<>
			<div className="mb-6 flex items-center gap-4">
				<h2 className="font-display text-4xl font-semibold tracking-[-0.02em] text-[#0A0A0A] md:text-[2.35rem]">
					{title}
				</h2>
				<div className="h-px flex-1 bg-[#B9B9B9]" />
			</div>
			{subtitle ? (
				<p className="mb-8 max-w-[680px] text-[1.03rem] leading-[1.75] text-[#6B6B6B]">
					{subtitle}
				</p>
			) : null}
		</>
	);
}

export function ServiceDetailPage({
	industry,
	page,
	relatedSolutions,
	solution,
}: ServiceDetailPageProps) {
	const reducedMotion = useReducedMotion();
	const [openFaq, setOpenFaq] = useState(0);
	const [activeSection, setActiveSection] = useState<SectionId>("overview");
	const sectionRefs = useRef<Record<SectionId, HTMLElement | null>>({
		overview: null,
		features: null,
		needs: null,
		faq: null,
	});

	useEffect(() => {
		const updateActiveSection = () => {
			const anchorY = 190;
			let bestId: SectionId = "overview";
			let bestDistance = Number.POSITIVE_INFINITY;

			for (const id of sectionOrder) {
				const el = sectionRefs.current[id];
				if (!el) continue;

				const distance = Math.abs(el.getBoundingClientRect().top - anchorY);
				if (distance < bestDistance) {
					bestDistance = distance;
					bestId = id;
				}
			}

			setActiveSection(bestId);
		};

		updateActiveSection();
		window.addEventListener("scroll", updateActiveSection, { passive: true });
		window.addEventListener("resize", updateActiveSection);

		return () => {
			window.removeEventListener("scroll", updateActiveSection);
			window.removeEventListener("resize", updateActiveSection);
		};
	}, []);

	const activeSectionIndex = sectionOrder.indexOf(activeSection);

	const sidebarMarkets = useMemo(() => {
		return Array.from(
			new Set([industry.name, ...relatedSolutions.map((item) => item.industryName)]),
		).slice(0, 3);
	}, [industry.name, relatedSolutions]);

	const scopeProof = useMemo(() => {
		const timeline = page.hero.stats[0]?.value ?? "2-6 weeks";
		const modules = page.hero.stats[1]?.value ?? "4-8";
		return `Typical phase-one: ${timeline} with ${modules} core modules.`;
	}, [page.hero.stats]);

	return (
		<main className="relative isolate bg-[#F3F2EF] pt-24">
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 -z-10 opacity-[0.28] [background-size:20px_20px] bg-[radial-gradient(circle_at_1px_1px,rgba(10,10,10,0.05)_1px,transparent_0)]"
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.75),transparent_66%)]"
			/>

			<section className="border-b border-[#E2E1DE] py-16 md:py-24">
				<div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-12">
					<FadeIn>
						<div className="mb-8 text-sm text-[#6B6B6B]">
							<Link className="transition-colors hover:text-[#0A0A0A]" href="/">
								Home
							</Link>{" "}
							<span className="mx-1 text-[#9A9A9A]">/</span>
							<Link
								className="transition-colors hover:text-[#0A0A0A]"
								href={industry.href}
							>
								Solutions
							</Link>{" "}
							<span className="mx-1 text-[#9A9A9A]">/</span>
							<span className="text-[#0A0A0A]">{solution.title}</span>
						</div>
					</FadeIn>

					<div className="grid grid-cols-12 gap-6">
						<FadeIn className="col-span-12 lg:col-span-8" delay={0.03}>
							<div className="mb-5 inline-flex items-center gap-3">
								<div className="h-[3px] w-18 bg-[#3D3D3D]" />
								<p className="font-sans text-xs font-medium uppercase tracking-[0.13em] text-[#6B6B6B]">
									Solution profile
								</p>
							</div>
							<h1 className="max-w-[12ch] font-display text-[clamp(2.55rem,6vw,5.2rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-[#0A0A0A]">
								{solution.title}
							</h1>
							<p className="mt-5 max-w-[680px] text-[1.08rem] leading-[1.72] text-[#6B6B6B]">
								{solution.description}
							</p>
							<div className="mt-7 flex flex-wrap gap-2.5">
								{solution.tags.slice(0, 4).map((tag) => (
									<span
										className="rounded-xl border border-[#E2E1DE] bg-[#F9F8F6] px-4 py-2 text-sm font-medium capitalize text-[#4A4A4A] shadow-[0_1px_0_rgba(0,0,0,0.03)]"
										key={tag}
									>
										{tag}
									</span>
								))}
							</div>
							<div className="mt-8 flex flex-wrap gap-3">
								<Button href="/#estimate">{page.hero.primaryCta}</Button>
								<Button href={industry.href} variant="secondary">
									{page.hero.secondaryCta}
								</Button>
							</div>
						</FadeIn>

						<FadeIn className="col-span-12 lg:col-span-4" delay={0.06}>
							<div className="rounded-2xl border border-[#D7D6D3] bg-[#F8F7F4] p-5">
								<p className="text-xs font-semibold uppercase tracking-[0.11em] text-[#6B6B6B]">
									Build profile
								</p>
								<div className="mt-3 space-y-2.5">
									{page.hero.stats.map((stat) => (
										<div
											className="rounded-lg border border-[#E2E1DE] bg-white px-3 py-2.5"
											key={stat.label}
										>
											<p className="text-[11px] uppercase tracking-[0.08em] text-[#9A9A9A]">
												{stat.label}
											</p>
											<p className="mt-1 text-sm font-semibold text-[#1C1C1C]">{stat.value}</p>
											{stat.note ? (
												<p className="mt-1 text-xs text-[#777777]">{stat.note}</p>
											) : null}
										</div>
									))}
								</div>
							</div>
						</FadeIn>
					</div>
				</div>
			</section>

			<section className="py-14 md:py-16">
				<div className="mx-auto grid max-w-[1200px] grid-cols-12 gap-8 px-6 md:px-10 lg:px-12">
					<div className="col-span-12 space-y-16 lg:col-span-8">
						<section
							id="overview"
							data-service-section="overview"
							ref={(el) => {
								sectionRefs.current.overview = el;
							}}
						>
							<FadeIn>
								<SectionTitle title="Overview" subtitle={page.overview.body} />
							</FadeIn>
						</section>

						<section
							id="features"
							data-service-section="features"
							ref={(el) => {
								sectionRefs.current.features = el;
							}}
						>
							<FadeIn delay={0.03}>
								<SectionTitle title="Key Features" />
								<div className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2">
									{page.modules.slice(0, 4).map((module, index) => {
										const Icon = featureIcons[index % featureIcons.length];

										return (
											<motion.article
												className="flex h-full flex-col rounded-2xl border border-[#E2E1DE] bg-[#F6F5F2] p-5"
												key={module.title}
												transition={{ duration: 0.18, ease: "easeOut" }}
												whileHover={reducedMotion ? undefined : { y: -3 }}
											>
												<div className="mb-4 flex items-center justify-between gap-3">
													<div className="inline-flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#3C3E41] text-white shadow-[0_10px_22px_-14px_rgba(0,0,0,0.8)]">
														<Icon className="size-5" strokeWidth={1.8} />
													</div>
													<div className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#D0CFCC] bg-white text-sm font-semibold text-[#3D3D3D]">
														{String(index + 1).padStart(2, "0")}
													</div>
												</div>
												<h3 className="font-display text-[1.9rem] font-semibold leading-[1.16] tracking-[-0.02em] text-[#0A0A0A]">
													{module.title}
												</h3>
												<p className="mt-2 text-base leading-[1.7] text-[#6B6B6B]">{module.description}</p>
											</motion.article>
										);
									})}
								</div>
							</FadeIn>
						</section>

						<section
							id="needs"
							data-service-section="needs"
							ref={(el) => {
								sectionRefs.current.needs = el;
							}}
						>
							<FadeIn delay={0.05}>
								<SectionTitle title="When You Need This" />
								<div className="space-y-3.5">
									{page.outcomes.slice(0, 4).map((outcome, index) => (
										<motion.div
											className="rounded-2xl border-l-[3px] border-[#4A4A4A] bg-[#F6F5F2] px-5 py-4"
											key={outcome}
											transition={{ duration: 0.18, ease: "easeOut" }}
											whileHover={reducedMotion ? undefined : { x: 2 }}
										>
											<div className="flex items-start gap-4">
												<div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-[#3C3E41] text-lg font-semibold text-white shadow-[0_10px_22px_-14px_rgba(0,0,0,0.8)]">
													{String(index + 1).padStart(2, "0")}
												</div>
												<div>
													<h4 className="font-display text-[1.7rem] font-semibold tracking-[-0.02em] text-[#0A0A0A]">
														{outcome.split(".")[0]}
													</h4>
													<p className="mt-1 text-base leading-[1.68] text-[#6B6B6B]">{outcome}</p>
												</div>
											</div>
										</motion.div>
									))}
								</div>
							</FadeIn>
						</section>

						<section
							id="faq"
							data-service-section="faq"
							ref={(el) => {
								sectionRefs.current.faq = el;
							}}
						>
							<FadeIn delay={0.06}>
								<SectionTitle title="Frequently Asked" />
								<div className="space-y-2.5">
									{page.faqs.map((faq, index) => {
										const isOpen = openFaq === index;

										return (
											<div
												className="rounded-xl border border-[#E2E1DE] bg-[#F6F5F2]"
												key={faq.question}
											>
												<button
													className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
													onClick={() =>
														setOpenFaq((current) => (current === index ? -1 : index))
													}
													type="button"
												>
													<span className="font-display text-xl font-semibold tracking-[-0.01em] text-[#0A0A0A]">
														{faq.question}
													</span>
													<span className="text-xl leading-none text-[#6B6B6B]">
														{isOpen ? "−" : "+"}
													</span>
												</button>
												<AnimatePresence initial={false}>
													{isOpen ? (
														<motion.div
															animate={{ height: "auto", opacity: 1 }}
															exit={{ height: 0, opacity: 0 }}
															initial={{ height: 0, opacity: 0 }}
															transition={{
																duration: 0.2,
																ease: [0.22, 1, 0.36, 1],
															}}
														>
															<p className="border-t border-[#E2E1DE] px-4 py-3 text-sm leading-[1.7] text-[#6B6B6B]">
																{faq.answer}
															</p>
														</motion.div>
													) : null}
												</AnimatePresence>
											</div>
										);
									})}
								</div>
							</FadeIn>
						</section>
					</div>

					<div className="col-span-12 lg:col-span-4">
						<div className="sticky top-28 space-y-4">
							<FadeIn delay={0.02}>
								<div className="rounded-2xl border border-[#D7D6D3] bg-[#F8F7F4] p-5">
									<p className="text-xs font-semibold uppercase tracking-[0.11em] text-[#6B6B6B]">
										On this page
									</p>
									<div className="relative mt-4">
										<motion.div
											animate={{ y: activeSectionIndex * 39 }}
											className="absolute left-0 top-0 h-8 w-1 rounded-full bg-[#0A0A0A]"
											transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
										/>
										<ul className="space-y-1.5">
											{sectionOrder.map((id) => {
												const isActive = activeSection === id;

												return (
													<li key={id}>
														<a
															className={`block rounded-md pl-4 pr-2 py-1.5 text-sm transition-colors ${
																isActive
																	? "text-[#0A0A0A]"
																	: "text-[#7A7A7A] hover:text-[#0A0A0A]"
															}`}
															href={`#${id}`}
														>
															{sectionLabels[id]}
														</a>
													</li>
												);
											})}
										</ul>
									</div>
								</div>
							</FadeIn>

							<FadeIn delay={0.05}>
								<div className="rounded-3xl border border-[#D4D3D0] bg-[#F8F7F4] p-6">
									<div className="mb-2 inline-flex items-center gap-2">
										<div className="h-[3px] w-8 bg-[#4A4A4A]" />
										<p className="text-xs font-semibold uppercase tracking-[0.11em] text-[#6B6B6B]">
											Industries
										</p>
									</div>
									<h3 className="font-display text-[2.1rem] font-semibold tracking-[-0.02em] text-[#0A0A0A]">
										Where it excels
									</h3>
									<div className="mt-4 space-y-2.5">
										{sidebarMarkets.map((market, index) => (
											<div
												className="border-b border-[#E2E1DE] pb-2.5 last:border-b-0"
												key={market}
											>
												<p className="text-[1.15rem] font-semibold text-[#1C1C1C]">{market}</p>
												<p className="mt-1 text-xs uppercase tracking-[0.11em] text-[#9A9A9A]">
													{index === 0
														? "Primary market"
														: index === 1
															? "Adjacent market"
															: "Expansion market"}
												</p>
											</div>
										))}
									</div>
								</div>
							</FadeIn>

							<FadeIn delay={0.08}>
								<div className="rounded-3xl border-2 border-[#3B3B3B] bg-[#F8F7F4] p-6">
									<p className="text-xs font-semibold uppercase tracking-[0.11em] text-[#6B6B6B]">
										Let&apos;s talk
									</p>
									<h3 className="mt-3 font-display text-[2rem] font-semibold leading-[1.15] tracking-[-0.02em] text-[#0A0A0A]">
										Ready to scope the next sprint?
									</h3>
									<p className="mt-3 text-base leading-[1.65] text-[#6B6B6B]">
										Share your brief and we&apos;ll map phase one inside the discovery chat.
									</p>
									<p className="mt-3 rounded-lg border border-[#E2E1DE] bg-white px-3 py-2 text-xs font-medium text-[#5E5E5E]">
										{scopeProof}
									</p>
									<div className="mt-5 grid gap-2.5">
										<Button href="/#estimate">Start a conversation</Button>
										<Button href={industry.href} variant="secondary">
											Download overview
										</Button>
									</div>
								</div>
							</FadeIn>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
