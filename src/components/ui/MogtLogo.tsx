import React from "react";

type Props = {
  className?: string;
  alt?: string;
};

export function MogtLogo({ className = "h-8 w-auto md:h-10", alt = "MOGT" }: Props) {
  return <img src="/mogt-logo.webp" className={className} alt={alt} />;
}

export default MogtLogo;
