import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "inverse";

type CommonButtonProps = {
	children: ReactNode;
	className?: string;
	variant?: ButtonVariant;
};

type LinkButtonProps = CommonButtonProps &
	Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
		href: string;
	};

type NativeButtonProps = CommonButtonProps &
	Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
		href?: undefined;
	};

export type ButtonProps = LinkButtonProps | NativeButtonProps;

const baseClasses =
	"group inline-flex items-center justify-center rounded-md font-sans text-sm font-medium tracking-[0.01em] transition-colors duration-150 transform-gpu will-change-transform transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]";

const variantClasses: Record<ButtonVariant, string> = {
	primary: "bg-[#0A0A0A] px-6 py-3 text-[#F9F8F6] hover:bg-[#1A1A1A]",
	secondary:
		"border border-[#0A0A0A] px-6 py-3 text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#F9F8F6]",
	tertiary:
		"rounded-none px-0 py-0 text-[#0A0A0A] underline decoration-[#E2E1DE] underline-offset-4 hover:decoration-[#0A0A0A]",
	inverse: "bg-[#F9F8F6] px-6 py-3 text-[#0A0A0A] hover:bg-[#E2E1DE]",
};

export function Button(props: ButtonProps) {
	const { children, className, href, variant = "primary", ...rest } = props;
	const classes = [baseClasses, variantClasses[variant], className].filter(Boolean).join(" ");

	if (href !== undefined) {
		return (
			<a className={classes} href={href} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
				{children}
			</a>
		);
	}

	const { type, ...buttonProps } = rest as ButtonHTMLAttributes<HTMLButtonElement>;

	return (
		<button className={classes} type={type ?? "button"} {...buttonProps}>
			{children}
		</button>
	);
}
