const footerGroups = [
	{
		title: "Studio",
		links: ["Services", "Work", "Process", "Pricing"],
	},
	{
		title: "Services",
		links: ["Web strategy", "UX systems", "Next.js builds", "Conversion audits"],
	},
	{
		title: "Contact",
		links: ["hello@mogt.studio", "Project intake", "LinkedIn", "Clutch"],
	},
];

import { MogtLogo } from "@/components/ui/MogtLogo";

export function Footer() {
	return (
		<footer className="bg-[#0A0A0A] py-16 md:py-20">
			<div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-12">
				<div className="grid grid-cols-12 gap-x-6 gap-y-12">
					<div className="col-span-12 md:col-span-5">
						<a className="inline-flex items-center font-display text-base font-bold tracking-[-0.02em] text-[#F9F8F6]" href="#home">
							<MogtLogo className="h-8 w-auto md:h-10" />
						</a>
						<p className="mt-4 max-w-[640px] font-sans text-sm leading-[1.6] tracking-[0.01em] text-[#6B6B6B]">
							A focused web studio for service businesses that need clearer positioning, sharper user
							journeys, and faster lead flow.
						</p>
					</div>

					{footerGroups.map((group) => (
						<div className="col-span-12 md:col-span-2" key={group.title}>
							<h2 className="mb-4 font-display text-sm font-semibold text-[#F9F8F6]">{group.title}</h2>
							<ul className="space-y-3">
								{group.links.map((link) => (
									<li key={link}>
										<a
											className="font-sans text-sm text-[#6B6B6B] transition-colors duration-150 hover:text-[#F9F8F6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
											href="#home"
										>
											{link}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="mt-16 border-t border-[#F9F8F6]/10 pt-8 font-sans text-xs text-[#6B6B6B]">
					<p>2026 MOGT Studio. Built for focused service teams.</p>
				</div>
			</div>
		</footer>
	);
}
