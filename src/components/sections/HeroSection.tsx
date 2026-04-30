"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Circle } from "lucide-react";
import { useEffect, useState } from "react";

const pills = ["Admin dashboards", "Client portals", "Workflow automation", "Secure workflows"];

const modules = ["Dashboard", "Users", "Roles", "Reports", "Billing"] as const;

type Module = (typeof modules)[number];

type ModuleStatus = { label: string; status: string };

type ModuleDetails = {
	selected: string;
	flow: string;
	includes: string;
	workflow: string;
	outputPrimary: string;
	outputSecondary: string;
	buildStatus: ModuleStatus[];
};

const moduleContent: Record<Module, ModuleDetails> = {
	Dashboard: {
		flow: "Collect → Visualize → Decide → Export",
		includes: "live metrics, filters, role-based views",
		selected: "Operations Dashboard",
		workflow: "Ingest → Validate → Visualize → Alert → Export",
		outputPrimary: "Output: operations dashboard ready",
		outputSecondary: "Deployment: role-aware analytics environment",
		buildStatus: [
			{ label: "KPI schema", status: "Ready" },
			{ label: "Alert rules", status: "Mapped" },
			{ label: "Widget states", status: "Configured" },
			{ label: "Export actions", status: "Typed" },
		],
	},
	Users: {
		flow: "Invite → Assign Role → Control Access → Audit",
		includes: "accounts, permissions, secure sessions",
		selected: "User Management",
		workflow: "Invite → Verify → Assign → Provision → Track",
		outputPrimary: "Output: user administration console ready",
		outputSecondary: "Deployment: secure identity layer enabled",
		buildStatus: [
			{ label: "Account lifecycle", status: "Ready" },
			{ label: "Invite flow", status: "Configured" },
			{ label: "Session policies", status: "Enforced" },
			{ label: "Access logs", status: "Tracked" },
		],
	},
	Roles: {
		flow: "Define → Assign → Restrict → Review",
		includes: "permissions, teams, protected actions",
		selected: "Role-Based Access",
		workflow: "Define Role → Attach Rights → Simulate → Approve → Enforce",
		outputPrimary: "Output: RBAC matrix validated",
		outputSecondary: "Deployment: protected routes activated",
		buildStatus: [
			{ label: "Permission matrix", status: "Validated" },
			{ label: "Route guards", status: "Ready" },
			{ label: "Policy inheritance", status: "Mapped" },
			{ label: "Approval chain", status: "Connected" },
		],
	},
	Reports: {
		flow: "Track → Filter → Generate → Share",
		includes: "exports, summaries, business visibility",
		selected: "Reports Engine",
		workflow: "Track Activity → Filter Data → Generate PDF/CSV → Share → Archive",
		outputPrimary: "Output: reporting suite generated",
		outputSecondary: "Deployment: scheduled exports enabled",
		buildStatus: [
			{ label: "Report templates", status: "Ready" },
			{ label: "Filter queries", status: "Typed" },
			{ label: "Scheduler", status: "Configured" },
			{ label: "Share channels", status: "Connected" },
		],
	},
	Billing: {
		flow: "Create → Review → Approve → Record",
		includes: "invoices, status tracking, approvals",
		selected: "Billing Workflow",
		workflow: "Draft Invoice → Review → Approve → Send → Reconcile",
		outputPrimary: "Output: billing workflow deployed",
		outputSecondary: "Deployment: finance-ready approval pipeline",
		buildStatus: [
			{ label: "Invoice model", status: "Ready" },
			{ label: "Approval routing", status: "Configured" },
			{ label: "Payment states", status: "Mapped" },
			{ label: "Audit trail", status: "Recorded" },
		],
	},
};

export function HeroSection() {
	const [isReady, setIsReady] = useState(false);
	const [reducedMotion, setReducedMotion] = useState(false);
	const [selectedModule, setSelectedModule] = useState<Module>("Dashboard");
	const [mouse, setMouse] = useState({ x: 0, y: 0 });
	const [tilt, setTilt] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const media = window.matchMedia("(prefers-reduced-motion: reduce)");
		const handleMotion = () => setReducedMotion(media.matches);
		handleMotion();
		media.addEventListener("change", handleMotion);

		const frame = window.requestAnimationFrame(() => setIsReady(true));

		return () => {
			window.cancelAnimationFrame(frame);
			media.removeEventListener("change", handleMotion);
		};
	}, []);

	const handleHeroMouseMove = (event: React.MouseEvent<HTMLElement>) => {
		const rect = event.currentTarget.getBoundingClientRect();
		setMouse({ x: event.clientX - rect.left, y: event.clientY - rect.top });
	};

	const handleConsoleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
		if (reducedMotion) {
			return;
		}

		const rect = event.currentTarget.getBoundingClientRect();
		const relativeX = (event.clientX - rect.left) / rect.width;
		const relativeY = (event.clientY - rect.top) / rect.height;
		setTilt({ x: (relativeX - 0.5) * 4, y: (0.5 - relativeY) * 4 });
	};

	const resetConsoleTilt = () => setTilt({ x: 0, y: 0 });

	const sectionStyle = {
		"--mouse-x": `${mouse.x}px`,
		"--mouse-y": `${mouse.y}px`,
	} as React.CSSProperties;

	const consoleStyle = reducedMotion
		? undefined
		: ({
				transform: `perspective(1300px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
			} as React.CSSProperties);

	const moduleSwapInitial = reducedMotion ? false : { opacity: 0, y: 8 };
	const moduleSwapAnimate = { opacity: 1, y: 0 };
	const moduleSwapExit = reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 };
	const moduleSwapTransition =
		reducedMotion ? { duration: 0 } : { duration: 0.26, ease: [0.22, 1, 0.36, 1] as const };

	return (
		<section
			className="mogt-hero relative isolate min-h-[calc(100svh-72px)] overflow-hidden lg:h-[calc(100svh-72px)] lg:max-h-[calc(100svh-72px)]"
			id="home"
			onMouseMove={handleHeroMouseMove}
			style={sectionStyle}
		>
			<div aria-hidden="true" className="absolute inset-0 -z-20 bg-[#F7F6F2]" />
			<div aria-hidden="true" className="mogt-grid absolute inset-0 -z-10" />
			<div aria-hidden="true" className="mogt-spotlight absolute inset-0 -z-10" />
			<div aria-hidden="true" className="mogt-depth absolute -right-40 top-16 -z-10 h-[34rem] w-[34rem] rounded-full" />

			<div className="hero-shell mx-auto grid h-full w-full max-w-[1200px] grid-cols-1 gap-4 px-4 py-4 md:px-8 md:py-5 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-center lg:px-12 lg:py-6">
				<div className="w-full max-w-none lg:max-w-[620px]">
					<div className={`hero-item ${isReady ? "is-ready" : ""}`} style={{ animationDelay: "80ms" }}>
						<p className="hero-eyebrow inline-flex items-center gap-3">
							<span aria-hidden="true" className="h-2 w-2 rounded-[2px] bg-[#0C0C0C]" />
							WEB APPS FOR OPERATIONS-HEAVY TEAMS
							<span aria-hidden="true" className="hidden h-px w-16 bg-black/25 sm:inline-block" />
						</p>
					</div>

					<h1 className="hero-heading mt-3 max-w-[560px] lg:pr-6 font-display text-[clamp(1.9rem,3.4vw,3.6rem)] font-semibold leading-[1.08] tracking-[-0.036em] text-[#050505]">
						<span className={`hero-item block ${isReady ? "is-ready" : ""}`} style={{ animationDelay: "180ms" }}>
							MOGT builds custom web apps
						</span>
						<span className={`hero-item block ${isReady ? "is-ready" : ""}`} style={{ animationDelay: "280ms" }}>
							for operations-heavy teams.
						</span>
					</h1>

					<p
						className={`hero-support hero-item mt-3 max-w-[560px] font-sans text-[clamp(0.98rem,1.1vw,1.05rem)] font-medium leading-[1.22] text-[#050505] ${
							isReady ? "is-ready" : ""
						}`}
						style={{ animationDelay: "320ms" }}
					>
						We replace spreadsheets, manual workflows, and patchwork tools with clean, role-aware systems.
					</p>

					<p
						className={`hero-description hero-item mt-2 max-w-[560px] font-sans text-[13px] leading-[1.5] text-[#666666] ${
							isReady ? "is-ready" : ""
						}`}
						style={{ animationDelay: "420ms" }}
					>
						From admin dashboards to client portals and ERP-style workflows, we build secure, scalable web apps that
						make operations easier to run.
					</p>

					<div
						className={`hero-actions hero-item mt-4 flex flex-wrap items-center gap-3 ${isReady ? "is-ready" : ""}`}
						style={{ animationDelay: "520ms" }}
					>
						<a className="hero-btn hero-btn-primary" href="#estimate">
							Start a build plan
							<ArrowRight aria-hidden="true" className="hero-btn-arrow size-4" strokeWidth={1.8} />
						</a>
						<a className="hero-btn hero-btn-secondary" href="#work">
							View systems
							<ArrowRight aria-hidden="true" className="hero-btn-arrow size-4" strokeWidth={1.8} />
						</a>
					</div>

					<ul className="hero-pills mt-3 grid max-w-[520px] grid-cols-2 gap-2 sm:gap-2.5" role="list">
						{pills.map((pill, index) => (
							<li
								className={`hero-pill hero-item ${isReady ? "is-ready" : ""}`}
								key={pill}
								style={{ animationDelay: `${700 + index * 80}ms` }}
							>
								<span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#050505]/45" />
								{pill}
							</li>
						))}
					</ul>
				</div>

				<div className={`hero-item relative ${isReady ? "is-ready" : ""}`} style={{ animationDelay: "740ms" }}>
					<div
						className="mogt-console mx-auto max-w-[520px]"
						onMouseLeave={resetConsoleTilt}
						onMouseMove={handleConsoleMouseMove}
						style={consoleStyle}
					>
						<div className="mogt-console-topbar">
							<div className="flex items-center gap-1.5" aria-hidden="true">
								<Circle className="size-2.5 fill-current stroke-0 text-black/35" />
								<Circle className="size-2.5 fill-current stroke-0 text-black/35" />
								<Circle className="size-2.5 fill-current stroke-0 text-black/35" />
							</div>
							<p className="font-mono text-[11px] uppercase tracking-[0.14em] text-black/55">MOGT System Builder</p>
							<p className="font-mono text-[11px] uppercase tracking-[0.14em] text-black/55">v1.0</p>
						</div>

						<div className="space-y-3 p-3 sm:p-4">
							<div className="flex items-start justify-between gap-3">
								<div>
									<h2 className="font-display text-[1.4rem] font-semibold tracking-[-0.03em] text-[#050505]">
										MOGT System Builder
									</h2>
									<p className="mt-1 text-sm text-[#666666]">Production-ready web app</p>
								</div>
								<span className="mogt-badge">BUILD PREVIEW</span>
							</div>

							<div>
								<p className="mogt-label">Modules</p>
								<div className="mt-2 flex gap-2 overflow-x-auto pb-1">
									{modules.map((module) => (
										<button
											aria-selected={module === selectedModule}
											className={`mogt-tab ${module === selectedModule ? "is-active" : ""}`}
											key={module}
											onClick={() => setSelectedModule(module)}
											type="button"
										>
											{module}
										</button>
									))}
								</div>
							</div>

							<AnimatePresence initial={false} mode="wait">
								<motion.div
									animate={moduleSwapAnimate}
									exit={moduleSwapExit}
									initial={moduleSwapInitial}
									key={selectedModule}
									transition={moduleSwapTransition}
								>

									<div className="mogt-module-card">
										<p className="mogt-label">Selected module: {moduleContent[selectedModule].selected}</p>
										<p className="mt-1.5 text-sm text-[#3D3D3D]">Flow: {moduleContent[selectedModule].flow}</p>
										<p className="mt-1 text-sm text-[#666666]">Includes: {moduleContent[selectedModule].includes}</p>
									</div>

									<div className="mt-3">
										<p className="mogt-label">Workflow</p>
										<p className={`mogt-workflow ${reducedMotion ? "reduce-motion" : ""}`}>
											{moduleContent[selectedModule].workflow}
										</p>
									</div>

									<div className="mt-3">
										<p className="mogt-label">Build Status</p>
										<motion.ul
											animate={{ opacity: 1, y: 0 }}
											className="mt-1"
											initial={reducedMotion ? false : { opacity: 0, y: 6 }}
											role="list"
											transition={reducedMotion ? { duration: 0 } : { delayChildren: 0.04, staggerChildren: 0.05 }}
										>
											{moduleContent[selectedModule].buildStatus.map((item) => (
												<motion.li
													animate={{ opacity: 1, y: 0 }}
													className="mogt-status-row is-ready"
													exit={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
													initial={reducedMotion ? false : { opacity: 0, y: 6 }}
													key={item.label}
													transition={
														reducedMotion
															? { duration: 0 }
															: { duration: 0.18, ease: [0.22, 1, 0.36, 1] as const }
													}
												>
													<span className="text-sm text-[#2F2F2F]">{item.label}</span>
													<span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1C1C1C]">
														<Check className={`size-3.5 text-[#77C86B] ${reducedMotion ? "" : "mogt-pulse"}`} strokeWidth={2.3} />
														{item.status}
													</span>
												</motion.li>
											))}
										</motion.ul>
									</div>

									<motion.div
										animate={moduleSwapAnimate}
										className="mogt-output-bar mt-3"
										initial={moduleSwapInitial}
										transition={moduleSwapTransition}
									>
										<p className="text-sm text-[#1F1F1F]">{moduleContent[selectedModule].outputPrimary}</p>
										<p className="mt-1 text-xs text-[#666666]">{moduleContent[selectedModule].outputSecondary}</p>
									</motion.div>
								</motion.div>
							</AnimatePresence>
						</div>
					</div>

					<div aria-hidden="true" className="floating-card floating-card-rbac">
						<p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#777777]">RBAC</p>
						<p className="mt-1 text-sm text-[#111111]">12 protected actions</p>
					</div>

					<div aria-hidden="true" className="floating-card floating-card-audit">
						<p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#777777]">Audit log</p>
						<p className="mt-1 text-sm text-[#111111]">Every action tracked</p>
					</div>

					<div aria-hidden="true" className="floating-card floating-card-api">
						<p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#777777]">API contracts</p>
						<p className="mt-1 text-sm text-[#111111]">Typed + validated</p>
					</div>
				</div>
			</div>

			<style jsx>{`
				.mogt-hero {
					--bg: #f7f6f2;
					--bg-alt: #f1f0ea;
					--surface: #ffffff;
					--surface-soft: #faf9f5;
					--text: #050505;
					--muted: #666666;
					--muted-2: #8a8a8a;
					--border: rgba(0, 0, 0, 0.12);
					--border-strong: rgba(0, 0, 0, 0.22);
					--accent-ready: #77c86b;
				}

				.mogt-grid {
					background-image:
						linear-gradient(rgba(0, 0, 0, 0.035) 1px, transparent 1px),
						linear-gradient(90deg, rgba(0, 0, 0, 0.035) 1px, transparent 1px);
					background-size: 48px 48px;
					opacity: 0.72;
				}

				.mogt-grid::before {
					content: "";
					position: absolute;
					inset: 0;
					background-image: repeating-linear-gradient(
						0deg,
						rgba(0, 0, 0, 0.03) 0,
						rgba(0, 0, 0, 0.03) 1px,
						transparent 1px,
						transparent 3px
					);
					opacity: 0.22;
					pointer-events: none;
				}

				.mogt-spotlight {
					background: radial-gradient(
						600px circle at var(--mouse-x) var(--mouse-y),
						rgba(0, 0, 0, 0.055),
						transparent 42%
					);
					transition: background 120ms linear;
				}

				.mogt-depth {
					background: radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.07), rgba(0, 0, 0, 0));
					filter: blur(64px);
					opacity: 0.2;
				}

				.hero-eyebrow {
					font-family: var(--font-inter);
					font-size: 0.72rem;
					font-weight: 600;
					letter-spacing: 0.17em;
					text-transform: uppercase;
					color: rgba(5, 5, 5, 0.76);
				}

				.hero-item {
					opacity: 0;
					transform: translateY(14px);
				}

				.hero-item.is-ready {
					animation: reveal-up 640ms cubic-bezier(0.2, 0.72, 0.2, 1) forwards;
				}

				.hero-btn {
					display: inline-flex;
					align-items: center;
					justify-content: center;
					gap: 0.55rem;
					border-radius: 12px;
					border: 1px solid transparent;
					padding: 0.9rem 1.25rem;
					font-size: 0.93rem;
					font-weight: 600;
					line-height: 1;
					letter-spacing: 0.01em;
					transition:
						transform 180ms ease,
						background-color 180ms ease,
						border-color 180ms ease,
						color 180ms ease;
				}

				.hero-btn:hover {
					transform: translateY(-2px);
				}

				.hero-btn:focus-visible {
					outline: 2px solid #050505;
					outline-offset: 2px;
				}

				.hero-btn-primary {
					background: #050505;
					color: #ffffff;
				}

				.hero-btn-primary:hover {
					background: #111111;
				}

				.hero-btn-secondary {
					background: rgba(255, 255, 255, 0.8);
					border-color: var(--border);
					color: #050505;
				}

				.hero-btn-secondary:hover {
					background: #f4f3ee;
					border-color: var(--border-strong);
				}

				.hero-btn-arrow {
					transition: transform 180ms ease;
				}

				.hero-btn:hover .hero-btn-arrow {
					transform: translateX(2px);
				}

				.hero-pill {
					display: inline-flex;
					align-items: center;
					gap: 0.5rem;
					border: 1px solid var(--border);
					border-radius: 11px;
					padding: 0.52rem 0.82rem;
					background: rgba(255, 255, 255, 0.82);
					font-size: 0.85rem;
					font-weight: 500;
					color: #252525;
					transition:
						transform 160ms ease,
						border-color 160ms ease,
						background-color 160ms ease;
				}

				.hero-pill:hover {
					transform: translateY(-2px);
					border-color: var(--border-strong);
					background: #ffffff;
				}

				.mogt-console {
					position: relative;
					background: rgba(255, 255, 255, 0.86);
					border: 1px solid rgba(0, 0, 0, 0.08);
					box-shadow: 0 18px 48px rgba(0, 0, 0, 0.08);
					border-radius: 16px;
					overflow: hidden;
					transition:
						transform 220ms ease,
						box-shadow 220ms ease;
				}

				.mogt-console::after {
					content: "";
					position: absolute;
					inset: 0;
					background: linear-gradient(180deg, rgba(255, 255, 255, 0.28), transparent 28%);
					pointer-events: none;
				}

				.mogt-console::before {
					content: "";
					position: absolute;
					left: -100%;
					top: 0;
					height: 100%;
					width: 36%;
					background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
					animation: scan-line 8s linear infinite;
					pointer-events: none;
				}

				.mogt-console-topbar {
					display: grid;
					grid-template-columns: auto 1fr auto;
					align-items: center;
					gap: 0.5rem;
					padding: 0.5rem 0.8rem;
					border-bottom: 1px solid rgba(0, 0, 0, 0.06);
					background: transparent;
				}

				.mogt-badge {
					display: inline-flex;
					align-items: center;
					padding: 0.32rem 0.56rem;
					border-radius: 999px;
					border: 1px solid var(--border);
					font-family: var(--font-inter);
					font-size: 0.64rem;
					font-weight: 600;
					letter-spacing: 0.13em;
					color: #444444;
				}

				.mogt-label {
					font-family: var(--font-inter);
					font-size: 0.68rem;
					font-weight: 600;
					letter-spacing: 0.13em;
					text-transform: uppercase;
					color: #767676;
				}

				.mogt-tab {
					flex: none;
					border: 1px solid var(--border);
					background: #f5f4ef;
					border-radius: 9px;
					padding: 0.44rem 0.72rem;
					font-size: 0.8rem;
					font-weight: 500;
					color: #343434;
					transition:
						background-color 140ms ease,
						border-color 140ms ease,
						color 140ms ease;
				}

				.mogt-tab:hover {
					border-color: var(--border-strong);
					background: #fbfaf6;
				}

				.mogt-tab:focus-visible {
					outline: 2px solid #050505;
					outline-offset: 2px;
				}

				.mogt-tab.is-active {
					background: #ffffff;
					border-color: rgba(0, 0, 0, 0.2);
					color: #050505;
				}

				.mogt-module-card {
					border-radius: 10px;
					border: 1px solid rgba(0, 0, 0, 0.07);
					background: #ffffff;
					padding: 0.44rem 0.64rem;
				}

				.mogt-module-tag {
					display: inline-flex;
					align-items: center;
					border-radius: 6px;
					border: 1px solid rgba(0,0,0,0.09);
					background: #f3f2ee;
					padding: 0.18rem 0.46rem;
					font-family: var(--font-inter);
					font-size: 0.63rem;
					font-weight: 600;
					letter-spacing: 0.09em;
					text-transform: uppercase;
					color: #555;
				}

				.mogt-workflow-steps {
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					gap: 0.3rem;
					margin-top: 0.5rem;
				}

				.mogt-step-group {
					display: inline-flex;
					align-items: center;
					gap: 0.3rem;
				}

				.mogt-step-pill {
					display: inline-flex;
					align-items: center;
					border-radius: 7px;
					border: 1px solid rgba(0,0,0,0.1);
					background: #f6f5f1;
					padding: 0.2rem 0.46rem;
					font-family: var(--font-inter);
					font-size: 0.74rem;
					font-weight: 500;
					color: #2a2a2a;
					white-space: nowrap;
				}

				.mogt-step-arrow {
					font-size: 0.8rem;
					color: rgba(0,0,0,0.28);
					line-height: 1;
				}

				.mogt-workflow {
					position: relative;
					margin-top: 0.5rem;
					padding-top: 0.65rem;
					font-size: 0.84rem;
					color: #3a3a3a;
					line-height: 1.45;
				}

				.mogt-workflow::before {
					content: "";
					position: absolute;
					top: 0;
					left: 0;
					height: 1px;
					width: 100%;
					background: linear-gradient(90deg, #050505, rgba(5, 5, 5, 0.08));
					transform-origin: left;
					transform: scaleX(0);
					animation: draw-line 900ms ease forwards;
					animation-delay: 980ms;
				}

				.mogt-workflow.reduce-motion::before {
					animation: none;
					transform: scaleX(1);
				}

				.mogt-status-row {
					display: grid;
					grid-template-columns: 1fr auto;
					align-items: center;
					gap: 0.5rem;
					padding: 0.36rem 0.5rem;
					border-bottom: 1px solid rgba(0, 0, 0, 0.06);
					opacity: 0;
					transform: translateY(8px);
				}

				.mogt-status-row:last-child {
					border-bottom: none;
				}

				.mogt-status-row:hover {
					background: rgba(0, 0, 0, 0.02);
				}

				.mogt-status-row.is-ready {
					animation: reveal-up 500ms cubic-bezier(0.24, 0.74, 0.3, 1) forwards;
				}

				.mogt-status-label {
					font-size: 0.88rem;
					color: #2F2F2F;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					display: block;
				}

				.mogt-status-badge {
					display: inline-flex;
					align-items: center;
					gap: 0.28rem;
					border-radius: 999px;
					border: 1px solid rgba(55,168,50,0.22);
					background: rgba(55,168,50,0.07);
					padding: 0.16rem 0.46rem;
					font-family: var(--font-inter);
					font-size: 0.72rem;
					font-weight: 600;
					color: #1f6e1a;
					white-space: nowrap;
					flex-shrink: 0;
					justify-self: end;
				}

				.mogt-output-bar {
					border-radius: 10px;
					border: 1px solid rgba(0, 0, 0, 0.1);
					background: #0d0d0d;
					padding: 0.36rem 0.56rem;
				}

				.mogt-output-bar p:first-child {
					color: #e8e8e8 !important;
				}

				.mogt-output-bar p:last-child {
					color: #666 !important;
				}

				.mogt-output-dot {
					display: inline-block;
					width: 6px;
					height: 6px;
					border-radius: 50%;
					background: #3fa832;
					flex-shrink: 0;
				}

				.mogt-pulse {
					animation: soft-pulse 2s ease-in-out infinite;
				}

				.floating-card {
					position: absolute;
					z-index: 2;
					border-radius: 14px;
					border: 1px solid rgba(0, 0, 0, 0.11);
					background: rgba(255, 255, 255, 0.9);
					padding: 0.7rem 0.8rem;
					box-shadow: 0 18px 40px rgba(0, 0, 0, 0.09);
					backdrop-filter: blur(1.8px);
				}

				.floating-card-rbac {
					top: -1.2rem;
					left: -2.2rem;
				}

				.floating-card-audit {
					right: -2.2rem;
					top: 6.2rem;
				}

				.floating-card-api {
					bottom: 0.7rem;
					left: -1.7rem;
				}

				@media (max-width: 1180px), (max-height: 900px) {
					.floating-card {
						display: none;
					}
				}

				@media (max-height: 860px) {
					.mogt-hero {
						height: auto;
						max-height: none;
						overflow-x: hidden;
						overflow-y: visible;
					}

					.hero-shell {
						gap: 1rem;
						padding-top: 1rem;
						padding-bottom: 1rem;
					}

					.hero-heading {
						font-size: clamp(1.85rem, 3.45vw, 3.8rem);
						line-height: 1.08;
					}

					.hero-support {
						font-size: clamp(0.98rem, 1.15vw, 1.08rem);
					}

					.hero-description {
						font-size: 0.82rem;
						line-height: 1.48;
					}

					.hero-actions {
						margin-top: 0.9rem;
					}

					.hero-pills {
						margin-top: 0.8rem;
					}

					.mogt-console-topbar {
						padding-top: 0.65rem;
						padding-bottom: 0.65rem;
					}

					.mogt-console {
						border-radius: 24px;
					}
				}

				@media (max-height: 760px) {
					.hero-shell {
						padding-top: 0.7rem;
						padding-bottom: 0.7rem;
					}

					.hero-heading {
						font-size: clamp(1.7rem, 3.1vw, 3.25rem);
						line-height: 1.1;
					}

					.hero-support {
						font-size: 0.95rem;
					}
				}

				@media (max-width: 639px) {
					.mogt-console {
						border-radius: 22px;
					}

					.hero-btn {
						width: 100%;
					}

					.hero-eyebrow {
						letter-spacing: 0.14em;
					}
				}

				@media (prefers-reduced-motion: reduce) {
					.mogt-spotlight {
						transition: none;
					}

					.hero-item,
					.hero-item.is-ready,
					.mogt-status-row,
					.mogt-status-row.is-ready {
						animation: none;
						opacity: 1;
						transform: none;
					}

					.mogt-console,
					.mogt-console::before,
					.mogt-pulse,
					.hero-btn,
					.hero-pill {
						animation: none;
						transition: none;
						transform: none;
					}
				}

				@keyframes reveal-up {
					from {
						opacity: 0;
						transform: translateY(14px);
					}

					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes draw-line {
					from {
						transform: scaleX(0);
					}

					to {
						transform: scaleX(1);
					}
				}

				@keyframes soft-pulse {
					0%,
					100% {
						opacity: 0.66;
					}

					50% {
						opacity: 1;
					}
				}

				@keyframes scan-line {
					from {
						left: -100%;
					}

					to {
						left: 130%;
					}
				}
			`}</style>
		</section>
	);
}
