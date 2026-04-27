import { MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";

const testimonials = [
	{
		author: "Maya Chen",
		body: "MOGT helped us explain a complex service in plain language. The site now matches how prospects actually evaluate us.",
		role: "Founder, Northstar Advisory",
	},
	{
		author: "Daniel Brooks",
		body: "The process stayed focused. Every design decision had a reason, and the final build was easy for our team to update.",
		role: "Director, FieldOps Collective",
	},
	{
		author: "Amara Singh",
		body: "We moved from a thin brochure site to a proper conversion path. The difference in inquiry quality was immediate.",
		role: "Partner, Ledgerline Partners",
	},
];

export function Testimonials() {
	return (
		<section className="bg-[#F3F2EF] py-24 md:py-32">
			<div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-12">
				<div className="max-w-[640px]">
					<Eyebrow>Testimonials</Eyebrow>
					<h2 className="mb-4 font-display text-4xl font-semibold leading-[1.15] tracking-[-0.02em] text-[#0A0A0A]">
						Clearer sites create clearer conversations.
					</h2>
					<p className="mb-12 font-sans text-base leading-[1.7] text-[#6B6B6B]">
						Clients come to us when the current website is harder to explain than the work itself.
					</p>
				</div>

				<div className="grid grid-cols-12 gap-6">
					{testimonials.map((testimonial) => (
						<Card className="col-span-12 md:col-span-4" key={testimonial.author}>
							<MessageSquare aria-hidden="true" className="mb-4 size-8 text-[#0A0A0A]" strokeWidth={1.5} />
							<p className="mb-5 font-sans text-base leading-[1.7] text-[#0A0A0A]">{testimonial.body}</p>
							<div className="border-t border-[#E2E1DE] pt-5">
								<p className="font-display text-lg font-medium text-[#0A0A0A]">{testimonial.author}</p>
								<p className="mt-1 font-sans text-sm leading-[1.6] tracking-[0.01em] text-[#6B6B6B]">
									{testimonial.role}
								</p>
							</div>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
