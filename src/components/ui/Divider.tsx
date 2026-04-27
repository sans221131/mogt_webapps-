import type { HTMLAttributes } from "react";

export function Divider({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			aria-hidden="true"
			className={["my-12 border-t border-[#E2E1DE] md:my-16", className].filter(Boolean).join(" ")}
			{...props}
		/>
	);
}
