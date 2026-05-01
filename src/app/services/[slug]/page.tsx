import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import {
	getServicePageBySlug,
	getStaticServiceParams,
} from "@/components/layout/megaMenuData.rich";
import { ServiceDetailPage } from "@/components/sections/ServiceDetailPage";

type PageProps = {
	params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
	return getStaticServiceParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const payload = getServicePageBySlug(slug);

	if (!payload) {
		return {
			description: "Service page not found",
			title: "Service Not Found | MOGT",
		};
	}

	return {
		description: payload.page.seo.description,
		keywords: payload.page.seo.keywords,
		title: payload.page.seo.title,
	};
}

export default async function ServicePage({ params }: PageProps) {
	const { slug } = await params;
	const payload = getServicePageBySlug(slug);

	if (!payload || !payload.industry) {
		notFound();
	}

	return (
		<>
			<Nav />
			<ServiceDetailPage
				industry={payload.industry}
				page={payload.page}
				relatedSolutions={payload.relatedSolutions}
				solution={payload.solution}
			/>
			<Footer />
		</>
	);
}
