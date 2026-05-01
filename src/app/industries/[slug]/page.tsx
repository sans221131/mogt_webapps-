import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import {
	getIndustryBySlug,
	getStaticIndustryParams,
} from "@/components/layout/megaMenuData.rich";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Tag } from "@/components/ui/Tag";

type PageProps = {
	params: Promise<{ slug: string }>;
};

function toAnchor(value: string) {
	return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function generateStaticParams() {
	return getStaticIndustryParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const industry = getIndustryBySlug(slug);

	if (!industry) {
		return {
			description: "Industry page not found",
			title: "Industry Not Found | MOGT",
		};
	}

	return {
		description: industry.page.description,
		title: `${industry.name} Solutions | MOGT`,
	};
}

export default async function IndustryPage({ params }: PageProps) {
	const { slug } = await params;
	const industry = getIndustryBySlug(slug);

	if (!industry) {
		notFound();
	}

	const anchors = industry.groups.map((group) => ({
		anchor: toAnchor(group.title),
		title: group.title,
	}));

	return (
		<>
			<Nav />
			<main className="bg-[#F9F8F6] pt-24">
				<section className="relative isolate overflow-hidden border-b border-[#E2E1DE] py-20 md:py-28">
					<div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_18%,#FFFFFF,transparent_42%),radial-gradient(circle_at_82%_6%,#ECEAE5,transparent_46%)]" />
					<div className="mx-auto grid max-w-[1200px] grid-cols-12 gap-6 px-6 md:px-10 lg:px-12">
						<div className="col-span-12 lg:col-span-7">
							<Eyebrow>{industry.page.eyebrow}</Eyebrow>
							<h1 className="max-w-[12ch] font-display text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[#0A0A0A]">
								{industry.page.title}
							</h1>
							<p className="mt-4 max-w-[640px] font-sans text-base leading-[1.7] text-[#6B6B6B] md:text-[1.06rem]">
								{industry.page.description}
							</p>
							<div className="mt-7 flex flex-wrap gap-2">
								<Tag>{industry.solutionCount} systems</Tag>
								{industry.page.highlights.map((highlight) => (
									<Tag key={highlight}>{highlight}</Tag>
								))}
							</div>
							<div className="mt-8 flex flex-wrap gap-3">
								<Button href={industry.featuredSolution.href}>Explore featured solution</Button>
								<Button href="/#estimate" variant="secondary">
									Plan a custom build
								</Button>
							</div>
						</div>

						<div className="col-span-12 lg:col-span-5">
							<div className="rounded-2xl border border-[#E2E1DE] bg-white p-5 md:p-6">
								<p className="font-sans text-xs font-medium uppercase tracking-[0.08em] text-[#6B6B6B]">Group map</p>
								<h2 className="mt-3 font-display text-2xl font-semibold leading-[1.25] tracking-[-0.01em] text-[#0A0A0A]">
									Choose where you want to start
								</h2>
								<div className="mt-5 space-y-2.5">
									{industry.groups.map((group) => (
										<a
											className="block rounded-lg border border-[#E2E1DE] bg-[#F9F8F6] px-3 py-3 transition-colors duration-150 hover:border-[#C9C8C5]"
											href={`#${toAnchor(group.title)}`}
											key={group.title}
										>
											<p className="font-display text-lg font-semibold tracking-[-0.01em] text-[#0A0A0A]">{group.title}</p>
											<p className="mt-1 text-sm leading-[1.6] text-[#6B6B6B]">{group.description}</p>
										</a>
									))}
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="border-b border-[#E2E1DE] bg-[#F3F2EF] py-10">
					<div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-12">
						<div className="flex flex-wrap gap-2">
							{anchors.map((item) => (
								<a
									className="rounded-full border border-[#E2E1DE] bg-white px-3 py-1.5 text-xs font-medium uppercase tracking-[0.08em] text-[#6B6B6B] transition-colors duration-150 hover:border-[#C9C8C5] hover:text-[#0A0A0A]"
									href={`#${item.anchor}`}
									key={item.anchor}
								>
									{item.title}
								</a>
							))}
						</div>
					</div>
				</section>

				<section className="border-b border-[#E2E1DE] py-16 md:py-20">
					<div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-12">
						<div className="overflow-hidden rounded-2xl border border-[#E2E1DE] bg-[#0A0A0A]">
							<div className="grid grid-cols-12">
								<div className="col-span-12 border-b border-white/10 p-6 md:p-8 lg:col-span-8 lg:border-b-0 lg:border-r lg:border-white/10">
									<p className="font-sans text-xs font-medium uppercase tracking-[0.08em] text-[#9A9A9A]">Featured build</p>
									<h2 className="mt-3 font-display text-4xl font-semibold leading-[1.12] tracking-[-0.02em] text-[#F9F8F6]">
										{industry.featuredSolution.title}
									</h2>
									<p className="mt-4 max-w-[620px] text-base leading-[1.7] text-[#D8D8D8]">{industry.featuredSolution.description}</p>
								</div>
								<div className="col-span-12 p-6 md:p-8 lg:col-span-4">
									<p className="text-xs uppercase tracking-[0.08em] text-[#9A9A9A]">Best for</p>
									<p className="mt-2 text-sm leading-[1.6] text-[#F9F8F6]">Teams starting with a clear phase-one service and scaling from a validated workflow.</p>
									<Link
										className="mt-6 inline-flex rounded-md border border-white/30 px-4 py-2 text-sm font-medium text-[#F9F8F6] transition-colors duration-150 hover:border-white/60"
										href={industry.featuredSolution.href}
									>
										Open service page
									</Link>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="py-16 md:py-20">
					<div className="mx-auto max-w-[1200px] space-y-12 px-6 md:px-10 lg:px-12">
						{industry.groups.map((group, index) => (
							<section
								className={`rounded-2xl border border-[#E2E1DE] p-5 md:p-7 ${index % 2 === 0 ? "bg-white" : "bg-[#F3F2EF]"}`}
								id={toAnchor(group.title)}
								key={group.title}
							>
								<div className="mb-6 grid grid-cols-12 gap-6">
									<div className="col-span-12 lg:col-span-4">
										<p className="font-sans text-xs font-medium uppercase tracking-[0.08em] text-[#6B6B6B]">Group</p>
										<h3 className="mt-2 font-display text-3xl font-semibold leading-[1.2] tracking-[-0.02em] text-[#0A0A0A]">{group.title}</h3>
										<p className="mt-3 text-sm leading-[1.7] text-[#6B6B6B]">{group.description}</p>
										<p className="mt-4 inline-flex rounded-full bg-[#EBEBE8] px-3 py-1 text-xs font-medium text-[#6B6B6B]">
											{group.solutions.length} solutions
										</p>
									</div>
									<div className="col-span-12 grid grid-cols-1 gap-4 lg:col-span-8 md:grid-cols-2">
										{group.solutions.map((solution) => (
											<article className="rounded-xl border border-[#E2E1DE] bg-[#F9F8F6] p-4" key={solution.href}>
												<p className="text-xs uppercase tracking-[0.08em] text-[#9A9A9A]">{solution.groupTitle}</p>
												<h4 className="mt-1 font-display text-2xl font-semibold leading-[1.25] tracking-[-0.01em] text-[#0A0A0A]">{solution.title}</h4>
												<p className="mt-2 text-sm leading-[1.7] text-[#6B6B6B]">{solution.description}</p>
												<Link
													className="mt-4 inline-flex text-sm font-medium text-[#0A0A0A] underline decoration-[#E2E1DE] underline-offset-4"
													href={solution.href}
												>
													View details
												</Link>
											</article>
										))}
									</div>
								</div>
							</section>
						))}
					</div>
				</section>

				<section className="bg-[#0A0A0A] py-16 md:py-20">
					<div className="mx-auto grid max-w-[1200px] grid-cols-12 gap-6 px-6 md:px-10 lg:px-12">
						<div className="col-span-12 lg:col-span-8">
							<p className="font-sans text-xs uppercase tracking-[0.08em] text-[#9A9A9A]">Custom workflow</p>
							<h2 className="mt-3 max-w-[12ch] font-display text-4xl font-semibold leading-[1.15] tracking-[-0.02em] text-[#F9F8F6]">
								Need a system between categories?
							</h2>
							<p className="mt-4 max-w-[620px] text-base leading-[1.7] text-[#D8D8D8]">
								We can combine modules from multiple groups and define a phased architecture around your exact operating model.
							</p>
						</div>
						<div className="col-span-12 flex flex-wrap items-end gap-3 lg:col-span-4 lg:justify-end">
							<Button href="/#estimate" variant="inverse">
								Build a custom plan
							</Button>
							<Button href="/" variant="secondary">
								Back to home
							</Button>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
