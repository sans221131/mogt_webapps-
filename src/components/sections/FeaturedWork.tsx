import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Tag } from "@/components/ui/Tag";

const projects = [
	{
		description: "A repositioned consulting site with a cleaner offer path and proof-led service pages.",
		meta: "Consulting",
		title: "Northstar Advisory",
	},
	{
		description: "A faster productized-service website with guided intake and stronger comparison content.",
		meta: "Operations",
		title: "FieldOps Collective",
	},
	{
		description: "A modular marketing site for a finance team moving from referral-only to inbound demand.",
		meta: "Finance",
		title: "Ledgerline Partners",
	},
];

export function FeaturedWork() {
	return (
		<section className="bg-[#F9F8F6] py-24 md:py-32" id="work">
			<div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-12">
				<div className="grid grid-cols-12 gap-x-6 gap-y-10">
					<div className="col-span-12 md:col-span-7">
						<Eyebrow>Featured work</Eyebrow>
						<h2 className="mb-4 font-display text-4xl font-semibold leading-[1.15] tracking-[-0.02em] text-[#0A0A0A]">
							Recent systems built around sharper decisions and easier inquiry.
						</h2>
					</div>
					<div className="col-span-12 md:col-span-5">
						<p className="max-w-[640px] font-sans text-base leading-[1.7] text-[#6B6B6B]">
							Each project balances brand clarity, practical content, responsive design, and implementation
							details that teams can keep using after launch.
						</p>
					</div>
				</div>

				<div className="mt-12 grid grid-cols-12 gap-6">
					{projects.map((project, index) => (
						<Card className="col-span-12 md:col-span-4" key={project.title}>
							<div className="mb-6 rounded-lg border border-[#E2E1DE] bg-[#F3F2EF] p-4">
								<div className="flex items-center justify-between border-b border-[#E2E1DE] pb-3">
									<div className="h-2 w-16 rounded-full bg-[#0A0A0A]" />
									<div className="h-2 w-8 rounded-full bg-[#C9C8C5]" />
								</div>
								<div className="space-y-3 pt-4">
									<div className="h-3 rounded-full bg-[#0A0A0A]" />
									<div className="h-3 w-3/4 rounded-full bg-[#C9C8C5]" />
									<div className="grid grid-cols-3 gap-2 pt-3">
										{[0, 1, 2].map((item) => (
											<div
												className="h-16 rounded-md border border-[#E2E1DE] bg-[#F9F8F6]"
												key={`${project.title}-${item}`}
											/>
										))}
									</div>
									<div className="h-2 rounded-full bg-[#2563EB]" style={{ width: `${44 + index * 16}%` }} />
								</div>
							</div>

							<Tag>{project.meta}</Tag>
							<h3 className="mb-2 mt-4 font-display text-2xl font-semibold leading-[1.25] tracking-[-0.01em] text-[#0A0A0A]">
								{project.title}
							</h3>
							<p className="mb-5 font-sans text-base leading-[1.7] text-[#6B6B6B]">{project.description}</p>
							<Button href="#estimate" variant="tertiary">
								Discuss a similar build
							</Button>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
