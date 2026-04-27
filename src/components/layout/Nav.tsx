import { Button } from "@/components/ui/Button";
import { MogtLogo } from "@/components/ui/MogtLogo";

const links = [
	{ href: "#services", label: "Services" },
	{ href: "#work", label: "Work" },
	{ href: "#process", label: "Process" },
	{ href: "#faq", label: "FAQ" },
];

export function Nav() {
	return (
			<nav className="sticky top-0 z-50 bg-[#F9F8F6]/90 py-4 backdrop-blur-sm">
			<div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 md:px-10 lg:px-12">
				<a
					className="inline-flex items-center font-display text-base font-bold tracking-[-0.02em] text-[#0A0A0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
					href="#home"
				>
					<MogtLogo className="h-8 w-auto md:h-10" />
				</a>

				<div className="hidden items-center gap-8 md:flex">
					{links.map((link) => (
						<a
							className="font-sans text-sm font-medium text-[#6B6B6B] transition-colors duration-150 hover:text-[#0A0A0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
							href={link.href}
							key={link.href}
						>
							{link.label}
						</a>
					))}
				</div>

				<Button href="#estimate" variant="secondary">
					Estimate a project
				</Button>
			</div>
		</nav>
	);
}
