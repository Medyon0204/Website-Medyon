import Link from "next/link";
import { cn } from "@/lib/cn";

interface MedyonLogoProps {
  variant?: "full" | "icon";
  className?: string;
  iconSize?: number;
}

export function MedyonLogo({ variant = "full", className, iconSize = 36 }: MedyonLogoProps) {
  const ratio = iconSize / 36;
  const wordmarkSize = Math.round(18 * ratio);

  return (
    <Link href="/" className={cn("flex items-center gap-2.5 shrink-0", className)} aria-label="Medyon – Zur Startseite">
      {/* Double Chevron Icon */}
      <svg
        width={iconSize}
        height={Math.round(iconSize * 0.72)}
        viewBox="0 0 36 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Left Chevron – Magenta */}
        <path
          d="M0 13L12 0L17 5L7 13L17 21L12 26L0 13Z"
          fill="#e6007e"
        />
        <path
          d="M8 13L20 0L25 5L15 13L25 21L20 26L8 13Z"
          fill="#e6007e"
          opacity="0.7"
        />
        {/* Right Arrow/Chevron – Teal */}
        <path
          d="M22 4L36 13L22 22L22 16L30 13L22 10L22 4Z"
          fill="#00c2cb"
        />
      </svg>

      {variant === "full" && (
        <span
          style={{ fontSize: `${wordmarkSize}px` }}
          className="font-black tracking-tight text-[#f0f4f8] uppercase leading-none"
        >
          MEDYON
        </span>
      )}
    </Link>
  );
}
