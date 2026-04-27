import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLElement> & {
	as?: "article" | "div" | "li";
	children: ReactNode;
};

export function Card({ as: Component = "article", children, className, ...props }: CardProps) {
	const classes = [
		"rounded-lg border border-[#E2E1DE] bg-[#F9F8F6] p-6 transition-colors duration-200 hover:border-[#C9C8C5] md:p-8",
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<Component className={classes} {...props}>
			{children}
		</Component>
	);
}
