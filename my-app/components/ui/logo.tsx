"use client";

import Image from "next/image";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeMap = {
  sm: { width: 80, height: 32 },
  md: { width: 100, height: 40 },
  lg: { width: 120, height: 48 },
};

export function Logo({ size = "md", className = "" }: LogoProps) {
  const { width, height } = sizeMap[size];

  return (
    <Image
      src="/logo.svg"
      alt="meDiet"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}
