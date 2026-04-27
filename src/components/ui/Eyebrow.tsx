import type { HTMLAttributes, ReactNode } from "react";

type EyebrowProps = HTMLAttributes<HTMLParagraphElement> & {
	children: ReactNode;
};

export function Eyebrow({ children, className, ...props }: EyebrowProps) {
	return (
		<p
			className={[
				"mb-3 font-sans text-xs font-medium uppercase leading-normal tracking-[0.08em] text-[#6B6B6B]",
				className,
			]
				.filter(Boolean)
				.join(" ")}
			{...props}
		>
			{children}
		</p>
	);
}
