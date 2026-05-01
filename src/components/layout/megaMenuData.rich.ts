// Mega Menu + Dynamic Service Page Data
// 10 industries, each grouped into 4 service categories with 5 solutions.
// This file works as both:
// 1) Mega-menu navigation data
// 2) Dynamic service-page content source
//
// Backwards compatibility kept:
// - industry.solutions still exists
// - getIndustryById() still exists
// - getSolutionByHref() still exists

export type ServiceStat = {
  label: string;
  value: string;
  note?: string;
};

export type ServiceModule = {
  title: string;
  description: string;
};

export type ServiceWorkflowStep = {
  label: string;
  title: string;
  description: string;
};

export type ServiceFAQ = {
  question: string;
  answer: string;
};

export type ServicePreviewPanel = {
  label: string;
  value: string;
  detail: string;
};

export type ServiceVisual = {
  icon: string;
  accent: string;
  heroVariant: "command-center" | "workflow-map" | "editorial-system";
  backgroundPattern: "grid" | "radial" | "mesh";
  previewPanels: ServicePreviewPanel[];
};

export type ServicePageContent = {
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    stats: ServiceStat[];
  };
  overview: {
    kicker: string;
    headline: string;
    body: string;
  };
  painPoints: string[];
  outcomes: string[];
  modules: ServiceModule[];
  workflow: ServiceWorkflowStep[];
  deliverables: string[];
  integrations: string[];
  proofPoints: ServiceStat[];
  faqs: ServiceFAQ[];
  visual: ServiceVisual;
};

export type SolutionInput = {
  title: string;
  description: string;
  href: string;
  icon?: string;
  featured?: boolean;
  tags?: string[];
  page?: Partial<ServicePageContent>;
};

export type Solution = Omit<SolutionInput, "page"> & {
  slug: string;
  industryId: string;
  industryName: string;
  industryHref: string;
  groupTitle: string;
  groupDescription: string;
  tags: string[];
  page: ServicePageContent;
};

export type SolutionGroupInput = {
  title: string;
  description: string;
  solutions: SolutionInput[];
};

export type SolutionGroup = {
  title: string;
  description: string;
  solutions: Solution[];
};

type IndustryInput = {
  id: string;
  name: string;
  description: string;
  href: string;
  icon?: string;
  groups: SolutionGroupInput[];
};

export type IndustryPageContent = {
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
};

export type Industry = Omit<IndustryInput, "groups"> & {
  groups: SolutionGroup[];
  featuredSolution: Solution;
  solutions: Solution[];
  solutionCount: number;
  page: IndustryPageContent;
};

const DEFAULT_PRIMARY_CTA = "Estimate this build";
const DEFAULT_SECONDARY_CTA = "Explore related systems";

const titleCase = (value: string) =>
  value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const slugFromHref = (href: string) => href.split("/").filter(Boolean).at(-1) ?? href;

const unique = <T,>(items: T[]) => Array.from(new Set(items));

const sentence = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

const lowerTitle = (title: string) => title.toLowerCase();

function inferComplexity(title: string) {
  const advancedTerms = [
    "platform",
    "core",
    "orchestration",
    "intelligence",
    "management",
    "marketplace",
    "streaming",
    "gateway",
    "analytics",
    "automation",
    "engine",
    "system",
  ];

  return advancedTerms.some((term) => lowerTitle(title).includes(term)) ? "Advanced" : "Focused";
}

function inferTimeline(title: string) {
  return inferComplexity(title) === "Advanced" ? "4–8 weeks" : "2–5 weeks";
}

function inferModuleCount(title: string) {
  return inferComplexity(title) === "Advanced" ? "6–9" : "4–6";
}

function inferAccent(industryId: string) {
  const accents: Record<string, string> = {
    fintech: "slate",
    healthcare: "emerald",
    ecommerce: "amber",
    edtech: "indigo",
    logistics: "orange",
    realestate: "stone",
    automotive: "zinc",
    travel: "sky",
    media: "violet",
    saas: "neutral",
  };

  return accents[industryId] ?? "neutral";
}

function inferTags(solution: SolutionInput, group: SolutionGroupInput, industry: IndustryInput) {
  const raw = `${solution.title} ${solution.description} ${group.title} ${industry.name}`.toLowerCase();
  const tags = [industry.id, group.title.toLowerCase(), ...(solution.tags ?? [])];

  const keywordMap: Record<string, string[]> = {
    portal: ["portal", "self-service", "customer access"],
    dashboard: ["dashboard", "analytics", "reporting", "visibility"],
    automation: ["automation", "workflow", "engine", "orchestration"],
    compliance: ["compliance", "audit", "regulatory", "risk"],
    commerce: ["checkout", "store", "marketplace", "pricing", "pos"],
    mobile: ["driver", "app", "mobile", "field"],
    ai: ["ai", "recommendation", "diagnostics", "forecasting", "scoring"],
    integration: ["api", "integration", "gateway", "sync"],
    operations: ["management", "system", "operations", "admin"],
  };

  for (const [tag, terms] of Object.entries(keywordMap)) {
    if (terms.some((term) => raw.includes(term))) tags.push(tag);
  }

  return unique(tags).slice(0, 8);
}

function buildModules(solution: SolutionInput, group: SolutionGroupInput, industry: IndustryInput): ServiceModule[] {
  return [
    {
      title: `${solution.title} Workspace`,
      description: `A focused operating space for ${industry.name} teams to manage ${lowerTitle(solution.title)} without jumping between scattered tools.`,
    },
    {
      title: "Workflow & State Engine",
      description: "Custom statuses, approvals, handoffs, reminders, and exception paths shaped around the real business process.",
    },
    {
      title: "Admin Command Center",
      description: "Dashboards for owners, managers, and operators to see queues, bottlenecks, live activity, and next actions.",
    },
    {
      title: "Role-Based Access Control",
      description: "Granular permissions for internal teams, external users, reviewers, finance, admins, and leadership roles.",
    },
    {
      title: "Audit Trail & Activity Log",
      description: "A clean record of decisions, edits, status changes, approvals, comments, and system-triggered actions.",
    },
    {
      title: "Reports, Exports & Integrations",
      description: `Operational reports, CSV/PDF exports, and integration points for the tools already used by the ${industry.name} business.`,
    },
  ];
}

function buildWorkflow(solution: SolutionInput): ServiceWorkflowStep[] {
  return [
    {
      label: "01",
      title: "Capture",
      description: `Collect the right ${lowerTitle(solution.title)} data through forms, portals, uploads, APIs, or internal admin screens.`,
    },
    {
      label: "02",
      title: "Route",
      description: "Send every request, record, or task to the correct person with clear ownership and status visibility.",
    },
    {
      label: "03",
      title: "Control",
      description: "Apply validation rules, permissions, approvals, SLAs, and audit history before anything reaches the final stage.",
    },
    {
      label: "04",
      title: "Report",
      description: "Turn daily activity into dashboards, exports, alerts, and decision-ready operational intelligence.",
    },
  ];
}

function buildPageContent(
  solution: SolutionInput,
  group: SolutionGroupInput,
  industry: IndustryInput,
): ServicePageContent {
  const complexity = inferComplexity(solution.title);
  const timeline = inferTimeline(solution.title);
  const moduleCount = inferModuleCount(solution.title);
  const tags = inferTags(solution, group, industry);

  const base: ServicePageContent = {
    seo: {
      title: `${solution.title} for ${industry.name} | Custom Web App Development`,
      description: `${solution.description} Built as a secure, scalable ${industry.name} web system with workflows, dashboards, permissions, and integrations.`,
      keywords: unique([
        solution.title,
        industry.name,
        group.title,
        "custom web app",
        "business system",
        "workflow automation",
        ...tags,
      ]),
    },
    hero: {
      eyebrow: `${industry.name} / ${group.title}`,
      title: `${solution.title} built around your actual workflow`,
      subtitle: `${solution.description} We design it as a production-grade web system with clean roles, dashboards, automation, and the boring-but-critical operational guts done properly.`,
      primaryCta: DEFAULT_PRIMARY_CTA,
      secondaryCta: DEFAULT_SECONDARY_CTA,
      stats: [
        { label: "Typical build", value: timeline, note: "Scope decides final timeline" },
        { label: "Core modules", value: moduleCount, note: "Dashboard, workflow, roles, reports" },
        { label: "Build type", value: complexity, note: `${group.title} system` },
      ],
    },
    overview: {
      kicker: "Why this system exists",
      headline: `${solution.title} should feel like an operating system, not another fragile tool duct-taped to the business.`,
      body: `Most ${industry.name} teams do not need another generic SaaS subscription. They need a tailored system that mirrors how work actually moves: who submits, who reviews, who approves, what gets blocked, and what leadership needs to see. This page shape gives you a strong starting point for a custom ${lowerTitle(solution.title)} build.`,
    },
    painPoints: [
      `${sentence(lowerTitle(solution.title))} work is scattered across spreadsheets, inboxes, chats, and disconnected tools.`,
      "Approvals and ownership are unclear, so bottlenecks only become visible when customers or staff complain.",
      "Managers cannot trust the data because every team keeps its own version of the truth.",
      "Existing tools either feel too generic or too bloated for the workflow that actually matters.",
    ],
    outcomes: [
      `A clean ${lowerTitle(solution.title)} workflow with clear stages, owners, and next actions.`,
      "A role-aware portal for internal teams, external stakeholders, admins, and leadership.",
      "Operational dashboards that expose queues, status, exceptions, and performance without manual reporting.",
      "Audit-safe records for approvals, changes, comments, files, and decision history.",
    ],
    modules: buildModules(solution, group, industry),
    workflow: buildWorkflow(solution),
    deliverables: [
      "UX flow map and module architecture",
      "Responsive web app interface",
      "Admin dashboard and management screens",
      "Database schema and API contracts",
      "Role-based permissions and guarded actions",
      "Reports, exports, and operational status views",
      "Deployment-ready build with handoff notes",
    ],
    integrations: [
      "Existing CRMs, ERPs, or internal tools",
      "Email, SMS, WhatsApp, or in-app notifications",
      "Payment, billing, identity, or document services where needed",
      "Analytics, reporting, storage, and automation pipelines",
    ],
    proofPoints: [
      { label: "Best fit", value: group.title, note: industry.name },
      { label: "Primary users", value: "Admins + operators", note: "External users optional" },
      { label: "System style", value: "Secure web app", note: "Built to scale past spreadsheets" },
    ],
    faqs: [
      {
        question: `What does a ${solution.title} build usually include?`,
        answer: `A typical build includes the core workflow, dashboards, database structure, admin controls, permissions, notifications, reports, and integrations required for the ${industry.name} use case.`,
      },
      {
        question: "Can this connect with our existing tools?",
        answer: "Yes. The system can be designed with integration points for CRMs, ERPs, payment tools, identity providers, document storage, analytics, and other internal platforms.",
      },
      {
        question: "Is this a template or a custom system?",
        answer: "It uses proven product patterns, but the workflow, modules, permissions, data model, and UI are shaped around your actual business process.",
      },
      {
        question: "How do we know the final scope?",
        answer: "The first step is mapping the workflow, user roles, data objects, integrations, and reporting needs. From there, the build can be split into a clear phase-one system and later upgrades.",
      },
    ],
    visual: {
      icon: solution.icon ?? industry.icon ?? "blocks",
      accent: inferAccent(industry.id),
      heroVariant: "command-center",
      backgroundPattern: "grid",
      previewPanels: [
        { label: "Queue", value: "Live status", detail: "Requests, records, or tasks sorted by urgency and owner." },
        { label: "Flow", value: "Rules engine", detail: "Stages, approvals, escalations, and exception handling." },
        { label: "Control", value: "RBAC + audit", detail: "Permissioned actions with a clean decision trail." },
        { label: "Insight", value: "Dashboards", detail: "KPIs, exports, and operational visibility for leadership." },
      ],
    },
  };

  return {
    ...base,
    ...solution.page,
    seo: { ...base.seo, ...solution.page?.seo },
    hero: { ...base.hero, ...solution.page?.hero },
    overview: { ...base.overview, ...solution.page?.overview },
    visual: { ...base.visual, ...solution.page?.visual },
  };
}

function hydrateSolution(
  solution: SolutionInput,
  group: SolutionGroupInput,
  industry: IndustryInput,
): Solution {
  return {
    ...solution,
    slug: slugFromHref(solution.href),
    industryId: industry.id,
    industryName: industry.name,
    industryHref: industry.href,
    groupTitle: group.title,
    groupDescription: group.description,
    tags: inferTags(solution, group, industry),
    page: buildPageContent(solution, group, industry),
  };
}

function defineIndustry(industry: IndustryInput): Industry {
  const groups = industry.groups.map((group) => ({
    title: group.title,
    description: group.description,
    solutions: group.solutions.map((solution) => hydrateSolution(solution, group, industry)),
  }));

  const solutions = groups.flatMap((group) => group.solutions);

  return {
    ...industry,
    groups,
    featuredSolution: solutions.find((solution) => solution.featured) ?? solutions[0],
    solutions,
    solutionCount: solutions.length,
    page: {
      eyebrow: "Browse systems by industry",
      title: `${industry.name} web systems for serious operations`,
      description: `${industry.description}. Explore ${solutions.length} system ideas grouped by how the work actually moves inside the business.`,
      highlights: groups.map((group) => group.title),
    },
  };
}

export const MEGA_MENU_CTA = {
  eyebrow: "Custom systems",
  title: "Can’t find the exact workflow?",
  description: "We can map the operation, shape the modules, and build the system around your process.",
  href: "/estimate",
  label: "Build a custom plan",
};

export const INDUSTRIES: Industry[] = [
  defineIndustry({
    id: "fintech",
    name: "FinTech",
    description: "Financial services and banking platforms",
    href: "/industries/fintech",
    icon: "landmark",
    groups: [
      {
        title: "Banking & Lending",
        description: "Digital banking, credit flows, and borrower-facing platforms.",
        solutions: [
          { title: "Neobank Core", description: "Digital-first banking infrastructure for modern financial products.", href: "/services/neobank-core" },
          { title: "Lending Platforms", description: "Loan origination, approvals, servicing, and borrower workflows.", href: "/services/lending-platforms" },
          { title: "Embedded Credit Underwriting", description: "Real-time credit decisions for embedded finance products.", href: "/services/embedded-credit-underwriting" },
          { title: "Credit Scoring", description: "Alternative scoring models and decision support tools.", href: "/services/credit-scoring" },
          { title: "KYC Automation", description: "Identity verification, onboarding checks, and compliance workflows.", href: "/services/kyc-automation" },
        ],
      },
      {
        title: "Risk & Compliance",
        description: "Controls, reporting, fraud prevention, and audit-safe processes.",
        solutions: [
          { title: "Quantitative Risk Labs", description: "Bespoke risk modeling, exposure analysis, and stress testing.", href: "/services/quantitative-risk-labs" },
          { title: "RegTech Compliance", description: "Regulatory reporting systems with structured review flows.", href: "/services/regtech-compliance" },
          { title: "Regulatory Automation Hub", description: "Automated filings, compliance calendars, and approval workflows.", href: "/services/regulatory-automation-hub" },
          { title: "Fraud Detection", description: "AI-assisted fraud signals, suspicious activity flags, and security review.", href: "/services/fraud-detection" },
          { title: "Tax Compliance", description: "Automated tax workflows, filing support, and finance operations control.", href: "/services/tax-compliance" },
        ],
      },
      {
        title: "Wealth & Assets",
        description: "Investment platforms, programmable agreements, and asset operations.",
        solutions: [
          { title: "Wealth Management", description: "Portfolio tools, advisor dashboards, and investor-facing portals.", href: "/services/wealth-management" },
          { title: "Robo-Advisory", description: "Automated investing experiences with personalized portfolio logic.", href: "/services/robo-advisory" },
          { title: "Tokenized Assets Platform", description: "Issue, manage, and track tokenized securities and digital assets.", href: "/services/tokenized-assets-platform" },
          { title: "Smart Contract Orchestration", description: "Programmable agreement flows with monitoring and operational guardrails.", href: "/services/smart-contract-orchestration" },
          { title: "Insurance Tech", description: "Policy, claims, risk, and customer-service systems for insurers.", href: "/services/insurance-tech" },
        ],
      },
      {
        title: "Finance Operations",
        description: "Treasury, reconciliation, data, and internal financial workflows.",
        solutions: [
          { title: "Real-Time Liquidity Orchestration", description: "Dynamic liquidity routing and treasury orchestration.", href: "/services/real-time-liquidity-orchestration", featured: true },
          { title: "Accounting Automation", description: "Financial reconciliation, transaction matching, and closing workflows.", href: "/services/accounting-automation" },
          { title: "Retail POS Infrastructure", description: "Point-of-sale systems connected to finance and inventory workflows.", href: "/services/pos-systems" },
          { title: "Privacy-Preserving Analytics", description: "Federated and differential privacy analytics for sensitive finance data.", href: "/services/privacy-preserving-analytics" },
          { title: "Synthetic Data Engine", description: "Privacy-safe synthetic datasets for testing and financial modeling.", href: "/services/synthetic-data-engine" },
        ],
      },
    ],
  }),
  defineIndustry({
    id: "healthcare",
    name: "HealthTech",
    description: "Medical workflows and healthcare platforms",
    href: "/industries/healthcare",
    icon: "heart-pulse",
    groups: [
      {
        title: "Patient Access",
        description: "Patient-facing systems for booking, consultation, and care access.",
        solutions: [
          { title: "Telemedicine", description: "Virtual consultation flows for clinics, doctors, and patients.", href: "/services/telemedicine" },
          { title: "Patient Portal", description: "Secure self-service access for records, appointments, and care updates.", href: "/services/patient-portal", featured: true },
          { title: "Appointment Booking", description: "Scheduling systems with availability, reminders, and intake workflows.", href: "/services/appointment-booking" },
          { title: "Mental Health Apps", description: "Digital therapy, guided support, and confidential patient journeys.", href: "/services/mental-health-apps" },
          { title: "Nutrition Tracking", description: "Diet, wellness, and progress tracking experiences.", href: "/services/nutrition-tracking" },
        ],
      },
      {
        title: "Clinical Operations",
        description: "Systems that help healthcare teams manage daily clinical work.",
        solutions: [
          { title: "EHR Systems", description: "Electronic health records with structured clinical workflows.", href: "/services/ehr-systems" },
          { title: "Lab Management", description: "Lab requests, result publishing, and workflow coordination.", href: "/services/lab-management" },
          { title: "Pharmacy Systems", description: "Prescription management, medication records, and dispense flows.", href: "/services/pharmacy-systems" },
          { title: "Care Coordination", description: "Provider networks, referrals, handoffs, and patient follow-up.", href: "/services/care-coordination" },
          { title: "Hospital Management", description: "Operational systems for departments, beds, teams, and administration.", href: "/services/hospital-management" },
        ],
      },
      {
        title: "Diagnostics & Research",
        description: "Platforms for diagnosis, imaging, research, and life sciences.",
        solutions: [
          { title: "Medical Imaging", description: "DICOM, PACS, and imaging workflows for medical teams.", href: "/services/medical-imaging" },
          { title: "Diagnostics AI", description: "Automated diagnostic support and assisted review tools.", href: "/services/diagnostics-ai" },
          { title: "Clinical Trials", description: "Research platforms for enrollment, study tracking, and reporting.", href: "/services/clinical-trials" },
          { title: "Drug Discovery", description: "AI-powered research workflows for discovery and analysis.", href: "/services/drug-discovery" },
          { title: "Genomics Platforms", description: "DNA sequencing, genomic data management, and analysis flows.", href: "/services/genomics-platforms" },
        ],
      },
      {
        title: "Insurance & Devices",
        description: "Connected care, claims, analytics, and health system integrations.",
        solutions: [
          { title: "Remote Monitoring", description: "IoT device and wearable data workflows for care teams.", href: "/services/remote-monitoring" },
          { title: "Medical Devices", description: "Device integrations, dashboards, alerts, and operational visibility.", href: "/services/medical-devices" },
          { title: "Health Analytics", description: "Population health, clinical KPIs, and healthcare intelligence.", href: "/services/health-analytics" },
          { title: "Health Insurance", description: "Claims, benefits, eligibility, and member-service platforms.", href: "/services/health-insurance" },
          { title: "Medical Billing", description: "Claims processing, billing workflows, and payment reconciliation.", href: "/services/medical-billing" },
        ],
      },
    ],
  }),
  defineIndustry({
    id: "ecommerce",
    name: "E-Commerce",
    description: "Retail and marketplace platforms",
    href: "/industries/ecommerce",
    icon: "shopping-bag",
    groups: [
      {
        title: "Storefront & Catalog",
        description: "Customer-facing shopping experiences and product discovery.",
        solutions: [
          { title: "Online Storefront", description: "Custom commerce storefronts built around brand and conversion.", href: "/services/online-storefront" },
          { title: "Marketplace Platform", description: "Multi-vendor marketplace systems with seller and buyer workflows.", href: "/services/marketplace-platform", featured: true },
          { title: "Product Catalog", description: "Structured product data, inventory visibility, and catalog controls.", href: "/services/product-catalog" },
          { title: "Search & Filters", description: "Product discovery, filtering, sorting, and faceted search experiences.", href: "/services/search-filters" },
          { title: "Customer Reviews", description: "Ratings, feedback loops, moderation, and social proof workflows.", href: "/services/customer-reviews" },
        ],
      },
      {
        title: "Checkout & Revenue",
        description: "Checkout, pricing, retention, and recurring revenue systems.",
        solutions: [
          { title: "Checkout Infrastructure", description: "Cart and checkout flows optimized for conversion and reliability.", href: "/services/shopping-cart" },
          { title: "Dynamic Pricing", description: "Smart pricing rules, promotions, and commercial logic.", href: "/services/dynamic-pricing" },
          { title: "Recurring Commerce Engine", description: "Subscription box and recurring order workflows.", href: "/services/subscription-box" },
          { title: "Loyalty Programs", description: "Rewards, points, tiers, and customer retention systems.", href: "/services/loyalty-programs" },
          { title: "Wishlist & Registry Engine", description: "Gift registry, wish list, and saved-item experiences.", href: "/services/gift-registry" },
        ],
      },
      {
        title: "Omnichannel Operations",
        description: "Back-office systems for orders, stock, fulfillment, and returns.",
        solutions: [
          { title: "Order Management", description: "Order lifecycle, fulfillment, exceptions, and operational control.", href: "/services/order-management" },
          { title: "Warehouse System", description: "Logistics automation, inventory movement, and warehouse workflows.", href: "/services/warehouse-system" },
          { title: "Returns Portal", description: "RMA management, return approvals, and customer-service flows.", href: "/services/returns-portal" },
          { title: "POS Integration", description: "Omnichannel retail flows across store, web, and inventory systems.", href: "/services/pos-integration" },
          { title: "Dropshipping", description: "Supplier integrations, catalog sync, and fulfillment routing.", href: "/services/dropshipping" },
        ],
      },
      {
        title: "Growth & Experience",
        description: "Interactive shopping, personalization, and B2B commerce experiences.",
        solutions: [
          { title: "Recommendation Engine", description: "Personalized product suggestions and merchandising logic.", href: "/services/recommendation-engine" },
          { title: "AR Try-On", description: "Virtual fitting and immersive product preview experiences.", href: "/services/ar-try-on" },
          { title: "Live Shopping", description: "Video commerce experiences with shoppable sessions.", href: "/services/live-shopping" },
          { title: "Social Commerce", description: "Shoppable posts, creator-led commerce, and social storefronts.", href: "/services/social-commerce" },
          { title: "B2B Portal", description: "Wholesale ordering, account pricing, and buyer workflows.", href: "/services/b2b-portal" },
        ],
      },
    ],
  }),
  defineIndustry({
    id: "edtech",
    name: "EdTech",
    description: "Education and learning platforms",
    href: "/industries/edtech",
    icon: "graduation-cap",
    groups: [
      {
        title: "Learning Delivery",
        description: "Systems for delivering live, recorded, and interactive learning.",
        solutions: [
          { title: "LMS Platform", description: "Learning management systems for courses, cohorts, and content.", href: "/services/lms-platform", featured: true },
          { title: "Virtual Classroom", description: "Live session delivery with attendance and learning workflows.", href: "/services/virtual-classroom" },
          { title: "Video Lectures", description: "On-demand learning libraries and structured video courses.", href: "/services/video-lectures" },
          { title: "Interactive Labs", description: "Hands-on practice environments and guided exercises.", href: "/services/interactive-labs" },
          { title: "Language Learning", description: "Adaptive lessons, progress paths, and practice experiences.", href: "/services/language-learning" },
        ],
      },
      {
        title: "Student Experience",
        description: "Portals, support, peer collaboration, and student engagement.",
        solutions: [
          { title: "Student Portal", description: "Academic access for schedules, content, progress, and records.", href: "/services/student-portal" },
          { title: "Study Groups", description: "Peer collaboration, group workspaces, and discussion tools.", href: "/services/study-groups" },
          { title: "Tutoring Platform", description: "One-to-one session booking, tutor matching, and learning support.", href: "/services/tutoring-platform" },
          { title: "Parent Portal", description: "Family engagement, updates, records, and communication workflows.", href: "/services/parent-portal" },
          { title: "Library System", description: "Digital resources, catalog access, and borrowing workflows.", href: "/services/library-system" },
        ],
      },
      {
        title: "Assessment & Credentials",
        description: "Course creation, examinations, tracking, and certification.",
        solutions: [
          { title: "Course Builder", description: "Content authoring, curriculum structure, and publishing tools.", href: "/services/course-builder" },
          { title: "Assessment Tools", description: "Quizzes, exams, rubrics, question banks, and grading workflows.", href: "/services/assessment-tools" },
          { title: "Gradebook", description: "Performance tracking, marks, feedback, and reporting flows.", href: "/services/gradebook" },
          { title: "Certification", description: "Digital credentials, completion certificates, and verification flows.", href: "/services/certification" },
          { title: "Learning Analytics", description: "Student insights, progress trends, and intervention signals.", href: "/services/learning-analytics" },
        ],
      },
      {
        title: "School Operations",
        description: "Administrative systems for admissions, attendance, and community.",
        solutions: [
          { title: "School Admin", description: "Student information systems and school administration workflows.", href: "/services/school-admin" },
          { title: "Attendance Tracking", description: "Automated attendance records, exceptions, and reporting.", href: "/services/attendance-tracking" },
          { title: "Admission Portal", description: "Application intake, review, document collection, and admissions flows.", href: "/services/admission-portal" },
          { title: "Career Services", description: "Job placement, employer pipelines, and student career workflows.", href: "/services/career-services" },
          { title: "Alumni Network", description: "Community spaces, alumni records, and engagement tools.", href: "/services/alumni-network" },
        ],
      },
    ],
  }),
  defineIndustry({
    id: "logistics",
    name: "Logistics",
    description: "Supply chain and transportation systems",
    href: "/industries/logistics",
    icon: "truck",
    groups: [
      {
        title: "Fleet & Routing",
        description: "Movement planning, drivers, routing, and location-aware operations.",
        solutions: [
          { title: "Fleet Management", description: "Vehicle tracking, fleet records, utilization, and operational control.", href: "/services/fleet-management" },
          { title: "Route Optimization", description: "Smart routing for faster, cheaper, and more reliable deliveries.", href: "/services/route-optimization", featured: true },
          { title: "Last Mile Delivery", description: "Final-mile dispatch, tracking, proof of delivery, and exceptions.", href: "/services/last-mile-delivery" },
          { title: "Driver App", description: "Mobile delivery workflows for drivers and field teams.", href: "/services/driver-app" },
          { title: "Geo-Fencing", description: "Location alerts, zone triggers, and geospatial workflow automation.", href: "/services/geo-fencing" },
        ],
      },
      {
        title: "Warehouse & Yard",
        description: "Inventory movement, yard control, storage, and transfer workflows.",
        solutions: [
          { title: "Warehouse System", description: "Inventory control, picking, packing, and warehouse operations.", href: "/services/warehouse-system-logistics" },
          { title: "Dock Scheduling", description: "Yard management, appointments, loading slots, and dock visibility.", href: "/services/dock-scheduling" },
          { title: "Cross-Docking", description: "Direct transfer workflows for fast inbound-to-outbound movement.", href: "/services/cross-docking" },
          { title: "Load Planning", description: "Capacity optimization, load sequencing, and shipment planning.", href: "/services/load-planning" },
          { title: "Cold Chain", description: "Temperature monitoring and exception handling for sensitive goods.", href: "/services/cold-chain" },
        ],
      },
      {
        title: "Freight & Partners",
        description: "Carrier, 3PL, partner, and freight cost workflows.",
        solutions: [
          { title: "Freight Booking", description: "Carrier booking, rate comparison, and shipment coordination.", href: "/services/freight-booking" },
          { title: "3PL Platform", description: "Third-party logistics portals and multi-client operations.", href: "/services/3pl-platform" },
          { title: "Carrier Portal", description: "Partner integration, carrier updates, and shipment collaboration.", href: "/services/carrier-portal" },
          { title: "Freight Audit", description: "Cost reconciliation, invoice checks, and charge dispute workflows.", href: "/services/freight-audit" },
          { title: "Shipping Labels", description: "Label automation, carrier rules, and shipping document generation.", href: "/services/shipping-labels" },
        ],
      },
      {
        title: "Compliance & Visibility",
        description: "Customs, shipment visibility, forecasting, and reverse logistics.",
        solutions: [
          { title: "Customs Clearance", description: "Border automation, clearance checks, and document workflows.", href: "/services/customs-clearance" },
          { title: "Customs Broker", description: "Compliance documents, broker coordination, and clearance support.", href: "/services/customs-broker" },
          { title: "Track & Trace", description: "Shipment visibility, event history, and customer-facing tracking.", href: "/services/track-trace" },
          { title: "Returns Logistics", description: "Reverse supply chain workflows for returns and recovery.", href: "/services/returns-logistics" },
          { title: "Demand Forecasting", description: "Predictive planning for capacity, stock, and shipment demand.", href: "/services/demand-forecasting" },
        ],
      },
    ],
  }),
  defineIndustry({
    id: "realestate",
    name: "Real Estate",
    description: "Property lifecycle and construction systems",
    href: "/industries/realestate",
    icon: "building-2",
    groups: [
      {
        title: "Property Discovery",
        description: "Listing, search, tours, valuations, and market visibility.",
        solutions: [
          { title: "Property Listings", description: "MLS-style property catalogs with search and listing workflows.", href: "/services/property-listings" },
          { title: "Virtual Tours", description: "3D walkthroughs and immersive property viewing experiences.", href: "/services/virtual-tours" },
          { title: "Booking System", description: "Viewing scheduler for agents, buyers, tenants, and site teams.", href: "/services/booking-system-realestate" },
          { title: "Property Valuation", description: "Automated valuation tools and market comparison workflows.", href: "/services/property-valuation" },
          { title: "Property Analytics", description: "Market insights, portfolio metrics, and property performance reports.", href: "/services/property-analytics" },
        ],
      },
      {
        title: "Sales & Leasing",
        description: "CRM, mortgage, leases, payments, and ownership workflows.",
        solutions: [
          { title: "CRM for Agents", description: "Lead management, follow-ups, pipelines, and agent dashboards.", href: "/services/crm-agents" },
          { title: "Mortgage Portal", description: "Loan applications, document collection, and borrower workflows.", href: "/services/mortgage-portal" },
          { title: "Lease Management", description: "Lease lifecycle, tenant records, renewals, and approvals.", href: "/services/lease-management", featured: true },
          { title: "Rent Collection", description: "Payment automation, tenant billing, and rent reconciliation.", href: "/services/rent-collection" },
          { title: "Title Search", description: "Deed verification, property history, and ownership checks.", href: "/services/title-search" },
        ],
      },
      {
        title: "Property Operations",
        description: "Tenant support, maintenance, automation, and document control.",
        solutions: [
          { title: "Maintenance Requests", description: "Work orders, issue tracking, vendor assignment, and tenant updates.", href: "/services/maintenance-requests" },
          { title: "HOA Portal", description: "Community management, notices, payments, and resident workflows.", href: "/services/hoa-portal" },
          { title: "Smart Home IoT", description: "Building automation, connected property controls, and device visibility.", href: "/services/smart-home-iot" },
          { title: "Energy Management", description: "Utility tracking, consumption reports, and efficiency workflows.", href: "/services/energy-management" },
          { title: "Document Vault", description: "Secure storage for contracts, deeds, compliance, and property files.", href: "/services/document-vault" },
        ],
      },
      {
        title: "Construction & Space",
        description: "Project delivery, BIM, contractor workflows, and space usage.",
        solutions: [
          { title: "Construction PM", description: "Project tracking, milestones, tasks, budgets, and site coordination.", href: "/services/construction-pm" },
          { title: "BIM Platform", description: "3D modeling workflows and construction data collaboration.", href: "/services/bim-platform" },
          { title: "Bidding System", description: "Contractor quotes, bid comparison, and procurement workflows.", href: "/services/bidding-system" },
          { title: "Site Inspection", description: "Mobile audits, checklists, photos, and issue reporting.", href: "/services/site-inspection" },
          { title: "Co-Working Booking", description: "Space reservations, availability, payments, and access workflows.", href: "/services/coworking-booking" },
        ],
      },
    ],
  }),
  defineIndustry({
    id: "automotive",
    name: "Automotive",
    description: "Connected vehicles and mobility platforms",
    href: "/industries/automotive",
    icon: "car",
    groups: [
      {
        title: "Mobility Platforms",
        description: "Rental, sharing, parking, auctions, and shared mobility systems.",
        solutions: [
          { title: "Ride Sharing", description: "Mobility platforms for ride requests, drivers, fares, and dispatch.", href: "/services/ride-sharing" },
          { title: "Car Rental", description: "Booking systems for fleets, availability, contracts, and returns.", href: "/services/car-rental" },
          { title: "Carpool Platform", description: "Shared commute matching, route planning, and member workflows.", href: "/services/carpool-platform" },
          { title: "Parking Platform", description: "Space discovery, reservations, payments, and occupancy visibility.", href: "/services/parking-platform" },
          { title: "Auction Platform", description: "Wholesale marketplace workflows for vehicle auctions and bids.", href: "/services/auction-platform" },
        ],
      },
      {
        title: "Fleet & Connected Vehicle",
        description: "Vehicle data, telemetry, tracking, and driver behavior systems.",
        solutions: [
          { title: "Fleet Telematics", description: "Vehicle data, fleet visibility, diagnostics, and operational dashboards.", href: "/services/fleet-telematics", featured: true },
          { title: "Connected Car", description: "Infotainment APIs, connected services, and vehicle data workflows.", href: "/services/connected-car" },
          { title: "Vehicle Tracking", description: "GPS monitoring, location history, and fleet status visibility.", href: "/services/vehicle-tracking" },
          { title: "Driver Safety", description: "Behavior analytics, safety scores, and coaching workflows.", href: "/services/driver-safety" },
          { title: "Toll Payment", description: "Automated tolls, trip records, and payment reconciliation.", href: "/services/toll-payment" },
        ],
      },
      {
        title: "Sales & Dealership",
        description: "Dealer tools, financing, valuations, parts, and buyer journeys.",
        solutions: [
          { title: "Dealer CRM", description: "Sales management, leads, follow-ups, and showroom pipelines.", href: "/services/dealer-crm" },
          { title: "Test Drive Booking", description: "Showroom scheduling tools for test drives and customer visits.", href: "/services/test-drive-booking" },
          { title: "Trade-In Valuation", description: "Instant quotes, appraisal workflows, and offer management.", href: "/services/trade-in-valuation" },
          { title: "Auto Financing", description: "Loan calculators, financing flows, and approval workflows.", href: "/services/auto-financing" },
          { title: "Parts Marketplace", description: "Aftermarket catalogs, seller workflows, and parts discovery.", href: "/services/parts-marketplace" },
        ],
      },
      {
        title: "EV, Service & Support",
        description: "Charging, workshops, insurance, diagnostics, and support workflows.",
        solutions: [
          { title: "EV Charging", description: "Charging station networks, sessions, payments, and availability.", href: "/services/ev-charging" },
          { title: "Service Booking", description: "Mechanic scheduling, job cards, workshop capacity, and reminders.", href: "/services/service-booking" },
          { title: "Diagnostic Tools", description: "OBD-II systems, diagnostic records, and service intelligence.", href: "/services/diagnostic-tools" },
          { title: "Roadside Assistance", description: "Emergency dispatch, service provider matching, and live tracking.", href: "/services/roadside-assistance" },
          { title: "Auto Insurance", description: "Usage-based pricing, policy workflows, and claims support.", href: "/services/auto-insurance" },
        ],
      },
    ],
  }),
  defineIndustry({
    id: "travel",
    name: "Travel & Hospitality",
    description: "Tourism and booking platforms",
    href: "/industries/travel",
    icon: "plane",
    groups: [
      {
        title: "Booking Engines",
        description: "Reservations, packages, activities, flights, and itinerary commerce.",
        solutions: [
          { title: "Hotel Booking", description: "Reservation systems for rooms, rates, availability, and guests.", href: "/services/hotel-booking" },
          { title: "Flight Search", description: "GDS integration, fare search, and flight booking workflows.", href: "/services/flight-search" },
          { title: "Tour Packages", description: "Itinerary builders, package pricing, and tour sales workflows.", href: "/services/tour-packages" },
          { title: "Activity Booking", description: "Experience booking platforms for tours, activities, and events.", href: "/services/activity-booking" },
          { title: "Cruise Booking", description: "Sailing reservations, cabin inventory, and passenger workflows.", href: "/services/cruise-booking" },
        ],
      },
      {
        title: "Hospitality Operations",
        description: "Hotel operations, distribution, revenue, and guest experience systems.",
        solutions: [
          { title: "Property Management", description: "Hotel operations, reservations, housekeeping, and guest records.", href: "/services/property-management" },
          { title: "Channel Manager", description: "OTA distribution, availability sync, and rate management.", href: "/services/channel-manager", featured: true },
          { title: "Revenue Management", description: "Dynamic pricing, demand intelligence, and revenue optimization.", href: "/services/revenue-management" },
          { title: "Guest Portal", description: "Self-service check-in, requests, payments, and guest updates.", href: "/services/guest-portal" },
          { title: "Concierge App", description: "Guest services, recommendations, requests, and in-stay communication.", href: "/services/concierge-app" },
        ],
      },
      {
        title: "Agency & Travel Ops",
        description: "Travel agency, corporate booking, guides, documents, and transport tools.",
        solutions: [
          { title: "Travel CRM", description: "Agent tools for leads, bookings, customers, and trip follow-ups.", href: "/services/travel-crm" },
          { title: "Group Travel", description: "Corporate bookings, group itineraries, and traveler coordination.", href: "/services/group-travel" },
          { title: "Car Hire", description: "Rental integration for travel packages and booking flows.", href: "/services/car-hire" },
          { title: "Travel Guides", description: "Destination information, editorial content, and trip planning tools.", href: "/services/travel-guides" },
          { title: "Visa Services", description: "Document processing, application tracking, and status updates.", href: "/services/visa-services" },
        ],
      },
      {
        title: "Commerce & Ancillaries",
        description: "Loyalty, insurance, events, F&B, and travel add-on revenue.",
        solutions: [
          { title: "Loyalty Programs", description: "Rewards systems, guest tiers, points, and member benefits.", href: "/services/loyalty-programs-travel" },
          { title: "Restaurant POS", description: "Food and beverage systems connected to hospitality operations.", href: "/services/restaurant-pos" },
          { title: "Event Management", description: "Venue booking, event planning, ticketing, and guest workflows.", href: "/services/event-management" },
          { title: "Travel Insurance", description: "Policy management, claims support, and add-on purchase flows.", href: "/services/travel-insurance" },
          { title: "Currency Exchange", description: "FX platform workflows for travel businesses and customers.", href: "/services/currency-exchange" },
        ],
      },
    ],
  }),
  defineIndustry({
    id: "media",
    name: "Media & Entertainment",
    description: "Content and streaming platforms",
    href: "/industries/media",
    icon: "clapperboard",
    groups: [
      {
        title: "Streaming & Distribution",
        description: "Audio, video, live content, hosting, and delivery infrastructure.",
        solutions: [
          { title: "Video Streaming", description: "OTT platforms, video playback, libraries, subscriptions, and access.", href: "/services/video-streaming", featured: true },
          { title: "Music Platform", description: "Audio streaming, libraries, playlists, artists, and listening flows.", href: "/services/music-platform" },
          { title: "Podcast Hosting", description: "Distribution systems, episode management, and publisher workflows.", href: "/services/podcast-hosting" },
          { title: "Live Broadcasting", description: "Real-time streaming, live events, chat, and broadcast operations.", href: "/services/live-broadcasting" },
          { title: "CDN Management", description: "Content delivery workflows, performance controls, and distribution visibility.", href: "/services/cdn-management" },
        ],
      },
      {
        title: "Content Operations",
        description: "Publishing, editing, licensing, asset control, and creative workflows.",
        solutions: [
          { title: "Content CMS", description: "Media management, publishing workflows, and editorial control.", href: "/services/content-cms" },
          { title: "Creator Tools", description: "Studio suite workflows for creators, teams, and media operators.", href: "/services/creator-tools" },
          { title: "Cloud Media Editing Suite", description: "Cloud editing workflows for video production and collaboration.", href: "/services/video-editor" },
          { title: "Photo Gallery", description: "Image hosting, galleries, asset libraries, and presentation tools.", href: "/services/photo-gallery" },
          { title: "Rights Management", description: "Licensing systems, usage rights, approvals, and contract workflows.", href: "/services/rights-management" },
        ],
      },
      {
        title: "Monetization & Growth",
        description: "Subscriptions, advertising, recommendations, analytics, and fan systems.",
        solutions: [
          { title: "Subscription Platform", description: "Paywall systems, subscriber access, billing, and entitlements.", href: "/services/subscription-platform" },
          { title: "Ad Server", description: "Monetization tools, placements, campaigns, and ad operations.", href: "/services/ad-server" },
          { title: "Recommendation AI", description: "Content discovery, personalization, and audience engagement logic.", href: "/services/recommendation-ai" },
          { title: "Analytics Dashboard", description: "Audience insights, content performance, and growth reporting.", href: "/services/analytics-dashboard" },
          { title: "Fan Engagement", description: "Community tools, fan journeys, loyalty, and engagement workflows.", href: "/services/fan-engagement" },
        ],
      },
      {
        title: "Communities & Experiences",
        description: "Interactive communities, events, games, collectibles, and publishing.",
        solutions: [
          { title: "Social Network", description: "Community platforms with profiles, feeds, groups, and moderation.", href: "/services/social-network" },
          { title: "Ticketing System", description: "Event sales, seat maps, ticket delivery, and attendee workflows.", href: "/services/ticketing-system" },
          { title: "Gaming Platform", description: "Multiplayer backend, accounts, leaderboards, and player operations.", href: "/services/gaming-platform" },
          { title: "NFT Marketplace", description: "Digital collectible marketplaces, listings, drops, and ownership flows.", href: "/services/nft-marketplace" },
          { title: "News Portal", description: "Publishing CMS, editorial workflows, and news distribution.", href: "/services/news-portal" },
        ],
      },
    ],
  }),
  defineIndustry({
    id: "saas",
    name: "SaaS & Enterprise",
    description: "Business software and internal systems",
    href: "/industries/saas",
    icon: "blocks",
    groups: [
      {
        title: "Core Business Systems",
        description: "Internal operating systems for teams, customers, finance, and stock.",
        solutions: [
          { title: "CRM Platform", description: "Customer management, sales pipelines, accounts, and contact workflows.", href: "/services/crm-platform" },
          { title: "Project Management", description: "Team collaboration, tasks, timelines, files, and delivery visibility.", href: "/services/project-management" },
          { title: "HR Management", description: "People operations, employee records, attendance, and HR workflows.", href: "/services/hr-management" },
          { title: "Accounting Software", description: "Financial systems for ledgers, reporting, reconciliation, and control.", href: "/services/accounting-software" },
          { title: "Inventory System", description: "Stock management, movements, approvals, and operational visibility.", href: "/services/inventory-system" },
        ],
      },
      {
        title: "Automation & Integration",
        description: "Workflow engines, API layers, documents, contracts, and data collection.",
        solutions: [
          { title: "Workflow Automation", description: "Process optimization, handoffs, approvals, and operational triggers.", href: "/services/workflow-automation", featured: true },
          { title: "API Gateway", description: "Integration hub for internal tools, third-party apps, and services.", href: "/services/api-gateway" },
          { title: "Form Workflow Engine", description: "Data collection, approval flows, validation, and submission logic.", href: "/services/form-builder" },
          { title: "Contract Management", description: "Legal workflow, document states, approvals, and renewal tracking.", href: "/services/contract-management" },
          { title: "Document Management", description: "File collaboration, secure storage, versioning, and access control.", href: "/services/document-management" },
        ],
      },
      {
        title: "Customer & Marketing",
        description: "Support, campaigns, knowledge, booking, and feedback systems.",
        solutions: [
          { title: "Help Desk", description: "Support ticketing, routing, SLAs, customer updates, and resolution flows.", href: "/services/help-desk" },
          { title: "Email Marketing", description: "Campaign automation, lists, segmentation, and performance reporting.", href: "/services/email-marketing" },
          { title: "Survey Platform", description: "Feedback tools, forms, analytics, and customer research workflows.", href: "/services/survey-platform" },
          { title: "Knowledge Base", description: "Documentation hub for customers, teams, support, and onboarding.", href: "/services/knowledge-base" },
          { title: "Calendar Booking", description: "Scheduling system for appointments, demos, calls, and resources.", href: "/services/calendar-booking" },
        ],
      },
      {
        title: "Productivity & Finance",
        description: "Analytics, meetings, time, billing, expenses, and operational reporting.",
        solutions: [
          { title: "Analytics Platform", description: "Business intelligence, dashboards, KPIs, and reporting workflows.", href: "/services/analytics-platform" },
          { title: "Video Conferencing", description: "Virtual meetings, rooms, session records, and communication tools.", href: "/services/video-conferencing" },
          { title: "Time Tracking", description: "Productivity tools, timesheets, approvals, and utilization reporting.", href: "/services/time-tracking" },
          { title: "Invoicing", description: "Billing automation, invoice generation, payments, and status tracking.", href: "/services/invoicing" },
          { title: "Expense Tracking", description: "Spend management, submissions, approvals, and finance review.", href: "/services/expense-tracking" },
        ],
      },
    ],
  }),
];


export const ALL_SOLUTIONS: Solution[] = INDUSTRIES.flatMap((industry) => industry.solutions);

export const getIndustryById = (id: string) => {
  return INDUSTRIES.find((industry) => industry.id === id);
};

export const getIndustryBySlug = (slug: string) => {
  return INDUSTRIES.find((industry) => slugFromHref(industry.href) === slug || industry.id === slug);
};

export const getSolutionByHref = (href: string) => {
  return ALL_SOLUTIONS.find((solution) => solution.href === href);
};

export const getSolutionBySlug = (slug: string) => {
  return ALL_SOLUTIONS.find((solution) => solution.slug === slug || slugFromHref(solution.href) === slug);
};

export const getServicePageBySlug = (slug: string) => {
  const solution = getSolutionBySlug(slug);
  if (!solution) return undefined;

  const industry = getIndustryById(solution.industryId);
  const relatedSolutions = getRelatedSolutions(solution.href, 6);

  return {
    solution,
    industry,
    page: solution.page,
    relatedSolutions,
  };
};

export const getRelatedSolutions = (href: string, limit = 6) => {
  const current = getSolutionByHref(href);
  if (!current) return [];

  const sameGroup = ALL_SOLUTIONS.filter(
    (solution) => solution.href !== href && solution.industryId === current.industryId && solution.groupTitle === current.groupTitle,
  );

  const sameIndustry = ALL_SOLUTIONS.filter(
    (solution) => solution.href !== href && solution.industryId === current.industryId && solution.groupTitle !== current.groupTitle,
  );

  const sameTags = ALL_SOLUTIONS.filter(
    (solution) =>
      solution.href !== href &&
      solution.industryId !== current.industryId &&
      solution.tags.some((tag) => current.tags.includes(tag)),
  );

  return unique([...sameGroup, ...sameIndustry, ...sameTags]).slice(0, limit);
};

export const getSolutionsByTag = (tag: string) => {
  return ALL_SOLUTIONS.filter((solution) => solution.tags.includes(tag.toLowerCase()));
};

export const getMegaMenuIndustries = () => INDUSTRIES;

export const getStaticServiceParams = () => {
  return ALL_SOLUTIONS.map((solution) => ({ slug: solution.slug }));
};

export const getStaticIndustryParams = () => {
  return INDUSTRIES.map((industry) => ({ slug: slugFromHref(industry.href) }));
};
