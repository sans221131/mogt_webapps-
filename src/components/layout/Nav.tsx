"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { MogtLogo } from "@/components/ui/MogtLogo";

const links = [
	{ href: "#services", label: "Services" },
	{ href: "#work", label: "Work" },
	{ href: "#process", label: "Process" },
	{ href: "#faq", label: "FAQ" },
];

export function Nav() {
	const [isVisible, setIsVisible] = useState(true);
	const [isSolid, setIsSolid] = useState(false);

	useEffect(() => {
		const topThreshold = 8;
		const solidThreshold = 10;
		const hideOffset = 120;
		const directionThreshold = 4;
		let lastY = window.scrollY;
		let rafId: number | null = null;

		const syncVisibility = () => {
			const y = window.scrollY;
			const delta = y - lastY;
			const isAtTop = y <= topThreshold;

			setIsSolid(y > solidThreshold);

			if (isAtTop) {
				setIsVisible(true);
			} else if (Math.abs(delta) > directionThreshold) {
				if (delta > 0 && y > hideOffset) {
					setIsVisible(false);
				}

				if (delta < 0) {
					setIsVisible(true);
				}
			}

			lastY = y > 0 ? y : 0;
			rafId = null;
		};

		const onScroll = () => {
			if (rafId !== null) {
				return;
			}

			rafId = window.requestAnimationFrame(syncVisibility);
		};

		syncVisibility();
		window.addEventListener("scroll", onScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", onScroll);
			if (rafId !== null) {
				window.cancelAnimationFrame(rafId);
			}
		};
	}, []);

	const base =
		"fixed inset-x-0 top-0 z-50 origin-top overflow-hidden py-4 transition-[transform,opacity,background-color,backdrop-filter,box-shadow,border-color,clip-path] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform";
	const topSurface = "border-b border-transparent bg-transparent shadow-none backdrop-blur-0";
	const solidSurface =
		"border-b border-black/10 bg-[#F9F8F6]/84 shadow-[0_12px_36px_-24px_rgba(0,0,0,0.42)] backdrop-blur-md supports-[backdrop-filter]:bg-[#F9F8F6]/76";
	const visible = "translate-y-0 opacity-100 [clip-path:inset(0_0_0_0)]";
	const hidden = "-translate-y-2 opacity-0 pointer-events-none shadow-none [clip-path:inset(0_0_100%_0)]";

	return (
		<nav className={`${base} ${isSolid ? solidSurface : topSurface} ${isVisible ? visible : hidden}`}>
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
