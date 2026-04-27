"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";

const faqs = [
	{
		answer:
			"Most focused websites take four to eight weeks after strategy is complete. Larger content systems or multi-stakeholder reviews can extend that timeline.",
		question: "How long does a typical project take?",
	},
	{
		answer:
			"Yes. The first phase clarifies the offer, audience, page structure, proof, and conversion goals so design starts from useful decisions.",
		question: "Do you help with strategy before design?",
	},
	{
		answer:
			"We build in Next.js and can connect the site to the CMS or content workflow that fits your team. The goal is a site your team can maintain without breaking the design system.",
		question: "Can our team update the site after launch?",
	},
	{
		answer:
			"Yes. Audits are useful when the site has traffic but the offer, structure, speed, or inquiry path is underperforming.",
		question: "Do you work on existing websites?",
	},
];

export function FAQSection() {
	const [openIndex, setOpenIndex] = useState(0);

	return (
		<section className="bg-[#F9F8F6] py-24 md:py-32" id="faq">
			<div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-12">
				<div className="grid grid-cols-12 gap-x-6 gap-y-12">
					<div className="col-span-12 md:col-span-5">
						<Eyebrow>FAQ</Eyebrow>
						<h2 className="mb-4 font-display text-4xl font-semibold leading-[1.15] tracking-[-0.02em] text-[#0A0A0A]">
							Questions that usually come up before a first project.
						</h2>
						<p className="max-w-[640px] font-sans text-base leading-[1.7] text-[#6B6B6B]">
							If your project has unusual constraints, the estimate request is the best place to outline
							them.
						</p>
					</div>

					<div className="col-span-12 md:col-span-7">
						{faqs.map((faq, index) => {
							const isOpen = openIndex === index;
							const answerId = `faq-answer-${index}`;

							return (
								<div className="border-t border-[#E2E1DE] py-5" key={faq.question}>
									<button
										aria-controls={answerId}
										aria-expanded={isOpen}
										className="flex w-full items-center justify-between gap-6 text-left font-sans text-base font-semibold text-[#0A0A0A] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
										onClick={() => setOpenIndex(isOpen ? -1 : index)}
										type="button"
									>
										<span>{faq.question}</span>
										<ChevronDown
											aria-hidden="true"
											className={["size-4 shrink-0 transition-transform duration-200", isOpen ? "rotate-180" : "rotate-0"]
												.filter(Boolean)
												.join(" ")}
											strokeWidth={1.5}
										/>
									</button>
									<div
										className={["overflow-hidden transition-opacity duration-200", isOpen ? "opacity-100" : "hidden opacity-0"]
											.filter(Boolean)
											.join(" ")}
										id={answerId}
									>
										<p className="mt-3 max-w-[640px] font-sans text-base leading-[1.7] text-[#6B6B6B]">
											{faq.answer}
										</p>
									</div>
								</div>
							);
						})}
						<div className="border-t border-[#E2E1DE]" />
					</div>
				</div>
			</div>
		</section>
	);
}
