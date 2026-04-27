import type { HTMLAttributes, ReactNode } from "react";

type TagProps = HTMLAttributes<HTMLSpanElement> & {
	children: ReactNode;
};

export function Tag({ children, className, ...props }: TagProps) {
	return (
		<span
			className={[
				"inline-flex rounded-full bg-[#EBEBE8] px-3 py-1 font-sans text-xs font-medium text-[#6B6B6B]",
				className,
			]
				.filter(Boolean)
				.join(" ")}
			{...props}
		>
			{children}
		</span>
	);
}
