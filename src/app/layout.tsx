import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LoadingScreen from "@/components/ui/LoadingScreen";

const inter = Inter({
	display: "swap",
	subsets: ["latin"],
	variable: "--font-inter",
});

export const metadata: Metadata = {
	description: "MOGT is a focused web studio for strategy-led service websites and Next.js builds.",
	title: "MOGT | Web Systems Studio",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link href="/favicon.svg" rel="icon" type="image/svg+xml" />
			</head>
			<body suppressHydrationWarning className={`${inter.variable} font-sans antialiased`}>
				<LoadingScreen />
				{children}
			</body>
		</html>
	);
}
