"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Dot, Menu, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { MogtLogo } from "@/components/ui/MogtLogo";

type MenuId = "services" | "work";

type SolutionItem = {
	description: string;
	href: string;
	title: string;
};

type IndustryItem = {
	description: string;
	focus: string;
	id: string;
	label: string;
	solutions: SolutionItem[];
	summary: string;
	totalSolutions: number;
};

type WorkItem = {
	description: string;
	href: string;
	label: string;
	meta: string;
};

const solutionBlueprints: Array<{ description: string; title: string }> = [
	{ description: "Automate multi-step handoffs and approvals for {focus} teams.", title: "Workflow Automation Hub" },
	{ description: "Give external stakeholders a clean, role-aware self-service portal.", title: "Client Portal Suite" },
	{ description: "Protect sensitive actions with granular permissions and policy controls.", title: "Role-Based Access Control" },
	{ description: "Track live performance with operational KPIs, filters, and drilldowns.", title: "Real-Time Analytics" },
	{ description: "Run staged approvals with SLAs, escalations, and audit-safe outcomes.", title: "Approval Pipeline Engine" },
	{ description: "Extract and validate incoming documents into structured business data.", title: "Document Intelligence" },
	{ description: "Capture user events and decision history for full accountability.", title: "Audit Trail Monitor" },
	{ description: "Manage pricing logic, invoicing, and payment status in one system.", title: "Billing and Invoicing" },
	{ description: "Coordinate recurring tasks, dependencies, and exception handling.", title: "Task Orchestration" },
	{ description: "Deliver contextual alerts across email, SMS, and in-app channels.", title: "Notification Center" },
	{ description: "Connect CRMs, ERPs, and internal tools with reliable data sync.", title: "Integration Gateway" },
	{ description: "Enforce schema and business rules before data reaches critical flows.", title: "Data Validation Layer" },
	{ description: "Route blocked items to the right owner with timed escalation paths.", title: "SLA and Escalation Manager" },
	{ description: "Generate branded exports, snapshots, and automated status reports.", title: "Report Composer" },
	{ description: "Enable fast mobile workflows for teams working beyond the office.", title: "Mobile Field Console" },
	{ description: "Embed compliance checkpoints inside everyday operational actions.", title: "Compliance Controls" },
	{ description: "Define, validate, and version API contracts used across your stack.", title: "API Contract Studio" },
	{ description: "Centralize SOPs, playbooks, and process guidance by team role.", title: "Knowledge Base Workspace" },
	{ description: "Handle large intake volumes through smart queues and priority logic.", title: "Queue Management" },
	{ description: "Predict operational bottlenecks with planning and forecast views.", title: "Forecasting Dashboard" },
];

const industrySeeds = [
	{ description: "Financial services and banking platforms", focus: "fintech", id: "fintech", label: "FinTech", summary: "Financial services and banking platforms" },
	{ description: "Medical and healthcare systems", focus: "health operations", id: "healthtech", label: "HealthTech", summary: "Medical workflows and care delivery systems" },
	{ description: "Retail and marketplace operations", focus: "commerce", id: "ecommerce", label: "E-Commerce", summary: "Retail and marketplace operations" },
	{ description: "Learning and education products", focus: "education", id: "edtech", label: "EdTech", summary: "Learning experiences and academic operations" },
	{ description: "Fulfillment and fleet management", focus: "logistics", id: "logistics", label: "Logistics", summary: "Supply chain and dispatch intelligence" },
	{ description: "Property and portfolio platforms", focus: "real estate", id: "realestate", label: "Real Estate", summary: "Property lifecycle and asset management" },
	{ description: "Production and quality systems", focus: "manufacturing", id: "manufacturing", label: "Manufacturing", summary: "Production planning and quality control" },
	{ description: "Case and compliance workflows", focus: "legal operations", id: "legaltech", label: "LegalTech", summary: "Legal workflow and compliance management" },
	{ description: "Talent and people operations", focus: "people operations", id: "hrtech", label: "HRTech", summary: "Hiring, onboarding, and workforce systems" },
	{ description: "Energy and sustainability tools", focus: "climate operations", id: "climatetech", label: "ClimateTech", summary: "Carbon, energy, and sustainability operations" },
] as const;

const industries: IndustryItem[] = industrySeeds.map((industry) => ({
	...industry,
	solutions: solutionBlueprints.map((solution) => ({
		description: solution.description.replace("{focus}", industry.focus),
		href: "#estimate",
		title: solution.title,
	})),
	totalSolutions: solutionBlueprints.length,
}));

const workItems: WorkItem[] = [
	{
		description: "Repositioned consulting site with proof-led service pages and cleaner offer flow.",
		href: "#work",
		label: "Northstar Advisory",
		meta: "Consulting",
	},
	{
		description: "Productized-service website with guided intake and stronger comparison UX.",
		href: "#work",
		label: "FieldOps Collective",
		meta: "Operations",
	},
	{
		description: "Modular finance marketing site built for inbound growth from referral-first motion.",
		href: "#work",
		label: "Ledgerline Partners",
		meta: "Finance",
	},
	{
		description: "Internal operations suite replacing spreadsheet-led request handling.",
		href: "#work",
		label: "Invyton Operations",
		meta: "B2B Services",
	},
];

const staticLinks = [
	{ href: "#process", label: "Process" },
	{ href: "#faq", label: "FAQ" },
];

export function Nav() {
	const [isVisible, setIsVisible] = useState(true);
	const [isSolid, setIsSolid] = useState(false);
	const [activeMenu, setActiveMenu] = useState<MenuId | null>(null);
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	const [mobileMenu, setMobileMenu] = useState<MenuId | null>(null);
	const [selectedIndustryId, setSelectedIndustryId] = useState<string>(industries[0].id);

	const selectedIndustry = useMemo(
		() => industries.find((industry) => industry.id === selectedIndustryId) ?? industries[0],
		[selectedIndustryId],
	);

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
					setActiveMenu(null);
					setIsMobileOpen(false);
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

	useEffect(() => {
		const onEsc = (event: KeyboardEvent) => {
			if (event.key !== "Escape") {
				return;
			}

			setActiveMenu(null);
			setIsMobileOpen(false);
			setMobileMenu(null);
		};

		const onOutsideClick = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (target.closest("[data-nav-shell]")) {
				return;
			}

			setActiveMenu(null);
		};

		window.addEventListener("keydown", onEsc);
		window.addEventListener("pointerdown", onOutsideClick);

		return () => {
			window.removeEventListener("keydown", onEsc);
			window.removeEventListener("pointerdown", onOutsideClick);
		};
	}, []);

	const openOrCloseMenu = (menu: MenuId) => {
		setIsMobileOpen(false);
		setMobileMenu(null);
		setActiveMenu((current) => (current === menu ? null : menu));
		if (menu === "services") {
			setSelectedIndustryId(industries[0].id);
		}
	};

	const openOrCloseMobileMenu = (menu: MenuId) => {
		setMobileMenu((current) => (current === menu ? null : menu));
	};

	const handleMenuLinkClick = () => {
		setActiveMenu(null);
		setIsMobileOpen(false);
		setMobileMenu(null);
	};

	const base =
		"fixed inset-x-0 top-0 z-50 origin-top py-4 transition-[transform,opacity,background-color,backdrop-filter,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform";
	const topSurface = "border-b border-transparent bg-transparent shadow-none backdrop-blur-0";
	const solidSurface =
		"border-b border-black/10 bg-[#F9F8F6]/84 shadow-[0_12px_36px_-24px_rgba(0,0,0,0.42)] backdrop-blur-md supports-[backdrop-filter]:bg-[#F9F8F6]/76";
	const visible = "translate-y-0 opacity-100";
	const hidden = "-translate-y-2 opacity-0 pointer-events-none shadow-none";
	const panelMotion = {
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -12 },
		initial: { opacity: 0, y: -12 },
		transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] as const },
	};

	return (
		<nav className={`${base} ${isSolid || activeMenu || isMobileOpen ? solidSurface : topSurface} ${isVisible ? visible : hidden}`} data-nav-shell>
			<div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 md:px-10 lg:px-12">
				<a
					className="inline-flex items-center font-display text-base font-bold tracking-[-0.02em] text-[#0A0A0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
					href="#home"
					onClick={handleMenuLinkClick}
				>
					<MogtLogo className="h-8 w-auto md:h-10" />
				</a>

				<div className="hidden items-center gap-2 lg:flex">
					<button
						aria-expanded={activeMenu === "services"}
						className={`inline-flex items-center gap-1 rounded-full px-3 py-2 font-sans text-sm font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${
							activeMenu === "services" ? "bg-black text-white" : "text-[#555555] hover:bg-black/5 hover:text-[#0A0A0A]"
						}`}
						onClick={() => openOrCloseMenu("services")}
						type="button"
					>
						Services
						<ChevronDown className={`size-4 transition-transform ${activeMenu === "services" ? "rotate-180" : ""}`} strokeWidth={1.8} />
					</button>

					<button
						aria-expanded={activeMenu === "work"}
						className={`inline-flex items-center gap-1 rounded-full px-3 py-2 font-sans text-sm font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${
							activeMenu === "work" ? "bg-black text-white" : "text-[#555555] hover:bg-black/5 hover:text-[#0A0A0A]"
						}`}
						onClick={() => openOrCloseMenu("work")}
						type="button"
					>
						Work
						<ChevronDown className={`size-4 transition-transform ${activeMenu === "work" ? "rotate-180" : ""}`} strokeWidth={1.8} />
					</button>

					{staticLinks.map((link) => (
						<a
							className="rounded-full px-3 py-2 font-sans text-sm font-medium text-[#666666] transition-colors duration-150 hover:bg-black/5 hover:text-[#0A0A0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
							href={link.href}
							key={link.href}
							onClick={handleMenuLinkClick}
						>
							{link.label}
						</a>
					))}
				</div>

				<div className="flex items-center gap-2">
					<div className="hidden lg:block">
						<Button href="#estimate" variant="secondary">
							Estimate a project
						</Button>
					</div>
					<button
						aria-expanded={isMobileOpen}
						className="inline-flex size-10 items-center justify-center rounded-full border border-black/10 bg-white/80 text-black lg:hidden"
						onClick={() => {
							setActiveMenu(null);
							setIsMobileOpen((current) => !current);
						}}
						type="button"
					>
						{isMobileOpen ? <X className="size-5" strokeWidth={1.9} /> : <Menu className="size-5" strokeWidth={1.9} />}
					</button>
				</div>
			</div>

			<AnimatePresence>
				{activeMenu && (
					<motion.div
						{...panelMotion}
						className="absolute inset-x-0 top-full hidden px-3 pt-3 lg:block lg:px-6"
					>
						<div className="mx-auto max-w-[1240px] overflow-hidden rounded-[20px] border border-black/10 bg-[#FCFBF8] shadow-[0_28px_80px_-46px_rgba(0,0,0,0.52)]">
							{activeMenu === "services" ? (
								<div className="grid grid-cols-[228px_minmax(0,1fr)] gap-0">
									<div className="border-r border-black/10 bg-[#F6F5F1] p-4 [scrollbar-width:thin]">
										<p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#6A6A6A]">Browse by</p>
										<h3 className="mt-2 font-display text-[1.65rem] font-semibold tracking-[-0.03em] text-[#1A1A1A]">Industries</h3>

										<div className="mt-4 max-h-[430px] space-y-1.5 overflow-x-hidden overflow-y-auto pr-1">
											{industries.map((industry) => {
												const isActive = selectedIndustry.id === industry.id;

												return (
													<button
														className={`w-full rounded-xl border px-3 py-2.5 text-left transition-all duration-200 ${
															isActive
																? "border-[#4f4f4f] bg-[#404040] text-white shadow-[0_10px_22px_-16px_rgba(0,0,0,0.64)]"
																: "border-black/8 bg-white text-[#1D1D1D] hover:border-black/20 hover:bg-[#FAF9F6]"
														}`}
														key={industry.id}
														onClick={() => setSelectedIndustryId(industry.id)}
														onFocus={() => setSelectedIndustryId(industry.id)}
														onMouseEnter={() => setSelectedIndustryId(industry.id)}
														type="button"
													>
														<div className="flex items-start justify-between gap-3">
															<p className="font-sans text-[1.01rem] font-semibold leading-[1.25] tracking-[-0.01em]">{industry.label}</p>
															<ArrowRight className={`size-4 shrink-0 ${isActive ? "text-white" : "text-[#777777]"}`} strokeWidth={1.8} />
														</div>
														<p className={`mt-1 truncate text-[0.78rem] leading-[1.3] ${isActive ? "text-white/85" : "text-[#737373]"}`}>{industry.summary}</p>
													</button>
												);
											})}
										</div>
									</div>

									<div className="min-w-0 p-5">
										<div className="flex items-start justify-between gap-5">
											<div>
												<p className="inline-flex items-center gap-1.5 font-display text-[1.85rem] font-semibold leading-[1.08] tracking-[-0.025em] text-[#202020]">
													<Dot className="size-5" />
													{selectedIndustry.label}
												</p>
												<p className="mt-1 text-[0.87rem] text-[#666666]">
													{selectedIndustry.summary} • {selectedIndustry.totalSolutions} solutions available
												</p>
											</div>
											<a
												className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#E6E5E1] px-3.5 py-2 text-[0.82rem] font-semibold tracking-[0.01em] text-[#262626] transition-colors hover:bg-[#DAD9D6]"
												href="#services"
												onClick={handleMenuLinkClick}
											>
												View all solutions
												<ArrowRight className="size-4" strokeWidth={2} />
											</a>
										</div>

										<div className="mt-4 border-t border-black/10 pt-4">
											<div className="max-h-[430px] overflow-y-auto pr-2">
												<div className="grid grid-cols-2 gap-2.5 xl:grid-cols-3">
													{selectedIndustry.solutions.map((solution) => (
														<a
															className="group rounded-xl border border-black/10 bg-white px-3 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-black/20 hover:shadow-[0_14px_34px_-24px_rgba(0,0,0,0.75)]"
															href={solution.href}
															key={solution.title}
															onClick={handleMenuLinkClick}
														>
															<p className="font-display text-[0.98rem] font-semibold leading-[1.2] tracking-[-0.01em] text-[#262626]">{solution.title}</p>
															<p className="mt-1.5 text-[0.79rem] leading-[1.35] text-[#757575]">{solution.description}</p>
														</a>
													))}
												</div>
											</div>
										</div>

										<div className="mt-4 border-t border-black/10 pt-4 text-[0.84rem] text-[#7A7A7A]">
											Can&apos;t find what you&apos;re looking for? <a className="font-medium text-[#303030] underline decoration-[#B9B9B9] underline-offset-4" href="#estimate" onClick={handleMenuLinkClick}>Contact us</a> for custom solutions.
										</div>
									</div>
								</div>
							) : (
								<div className="grid grid-cols-12 gap-0">
									<div className="col-span-8 border-r border-black/10 p-5">
										<p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#707070]">Selected builds</p>
										<div className="mt-4 grid grid-cols-2 gap-2.5">
											{workItems.map((item) => (
												<a
													className="group block rounded-xl border border-black/10 bg-white px-3 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-black/20 hover:shadow-[0_14px_30px_-24px_rgba(0,0,0,0.8)]"
													href={item.href}
													key={item.label}
													onClick={handleMenuLinkClick}
												>
													<div className="mb-2 inline-flex rounded-full border border-black/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.13em] text-[#656565]">{item.meta}</div>
													<div className="flex items-start justify-between gap-3">
														<p className="font-display text-[1rem] font-semibold leading-[1.2] tracking-[-0.02em] text-[#111111]">{item.label}</p>
														<ArrowRight className="mt-0.5 size-4 shrink-0 text-[#3B3B3B] transition-transform group-hover:translate-x-0.5" strokeWidth={1.8} />
													</div>
													<p className="mt-1.5 text-[0.82rem] leading-[1.45] text-[#666666]">{item.description}</p>
												</a>
											))}
										</div>
									</div>
									<div className="col-span-4 bg-[#F4F2EC] p-5">
										<div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#4B4B4B]">Project outcomes</div>
										<h3 className="mt-3 font-display text-[1.3rem] font-semibold leading-[1.16] tracking-[-0.02em] text-[#121212]">
											Sites redesigned as decision systems, not brochure pages.
										</h3>
										<p className="mt-2 text-[0.84rem] leading-[1.5] text-[#5F5F5F]">
											Every case includes cleaner offer narratives, better conversion framing, and faster implementation details.
										</p>
										<div className="mt-4 grid grid-cols-2 gap-2">
											{workItems.map((item) => (
												<div className="rounded-xl border border-black/10 bg-white px-2 py-2 text-center" key={item.label}>
													<p className="font-mono text-[10px] uppercase tracking-[0.11em] text-[#707070]">{item.meta}</p>
												</div>
											))}
										</div>
										<a
											className="mt-4 inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#171717]"
											href="#work"
											onClick={handleMenuLinkClick}
										>
											View featured work
											<ArrowRight className="size-4" strokeWidth={1.8} />
										</a>
									</div>
								</div>
							)}
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{isMobileOpen && (
					<motion.div
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						initial={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
						className="mx-6 mt-3 rounded-[20px] border border-black/10 bg-[#FFFEFC] p-4 shadow-[0_20px_55px_-32px_rgba(0,0,0,0.55)] lg:hidden"
					>
						<div className="space-y-2">
							<button
								className="flex w-full items-center justify-between rounded-xl border border-black/10 bg-[#F4F2EC] px-3 py-2.5 text-left"
								onClick={() => openOrCloseMobileMenu("services")}
								type="button"
							>
								<span className="font-sans text-sm font-semibold text-[#111111]">Services</span>
								<ChevronDown className={`size-4 transition-transform ${mobileMenu === "services" ? "rotate-180" : ""}`} strokeWidth={1.8} />
							</button>
							<AnimatePresence initial={false}>
								{mobileMenu === "services" && (
									<motion.div
										animate={{ height: "auto", opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										initial={{ height: 0, opacity: 0 }}
										transition={{ duration: 0.2 }}
										className="overflow-hidden"
									>
										<div className="space-y-3 px-1 py-1">
											<div className="flex gap-2 overflow-x-auto pb-1">
												{industries.map((industry) => (
													<button
														className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold ${selectedIndustry.id === industry.id ? "border-black bg-black text-white" : "border-black/10 bg-white text-[#444]"}`}
														key={industry.id}
														onClick={() => setSelectedIndustryId(industry.id)}
														type="button"
													>
														{industry.label}
													</button>
												))}
											</div>
											<p className="px-1 text-xs text-[#666666]">{selectedIndustry.summary}</p>
											<div className="max-h-64 space-y-2 overflow-y-auto pr-1">
												{selectedIndustry.solutions.map((solution) => (
													<a
														className="block rounded-lg border border-black/10 bg-white px-3 py-3"
														href={solution.href}
														key={solution.title}
														onClick={handleMenuLinkClick}
													>
														<p className="font-sans text-sm font-semibold text-[#121212]">{solution.title}</p>
														<p className="mt-1 text-xs leading-[1.5] text-[#666666]">{solution.description}</p>
													</a>
												))}
											</div>
										</div>
									</motion.div>
								)}
							</AnimatePresence>

							<button
								className="flex w-full items-center justify-between rounded-xl border border-black/10 bg-[#F4F2EC] px-3 py-2.5 text-left"
								onClick={() => openOrCloseMobileMenu("work")}
								type="button"
							>
								<span className="font-sans text-sm font-semibold text-[#111111]">Work</span>
								<ChevronDown className={`size-4 transition-transform ${mobileMenu === "work" ? "rotate-180" : ""}`} strokeWidth={1.8} />
							</button>
							<AnimatePresence initial={false}>
								{mobileMenu === "work" && (
									<motion.div
										animate={{ height: "auto", opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										initial={{ height: 0, opacity: 0 }}
										transition={{ duration: 0.2 }}
										className="overflow-hidden"
									>
										<div className="space-y-2 px-1 py-1">
											{workItems.map((item) => (
												<a
													className="block rounded-lg border border-black/10 bg-white px-3 py-3"
													href={item.href}
													key={item.label}
													onClick={handleMenuLinkClick}
												>
													<p className="font-sans text-sm font-semibold text-[#121212]">{item.label}</p>
													<p className="mt-1 text-xs leading-[1.5] text-[#666666]">{item.description}</p>
												</a>
											))}
										</div>
									</motion.div>
								)}
							</AnimatePresence>

							<div className="grid grid-cols-2 gap-2 pt-1">
								{staticLinks.map((link) => (
									<a
										className="rounded-xl border border-black/10 bg-white px-3 py-2.5 text-center font-sans text-sm font-medium text-[#444444]"
										href={link.href}
										key={link.href}
										onClick={handleMenuLinkClick}
									>
										{link.label}
									</a>
								))}
							</div>
						</div>

						<a
							className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-4 py-2.5 text-sm font-medium text-white"
							href="#estimate"
							onClick={handleMenuLinkClick}
						>
							<Sparkles className="size-4" strokeWidth={1.9} />
							Estimate a project
						</a>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
}
