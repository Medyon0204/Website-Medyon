import { cn } from "@/lib/cn";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  color?: "magenta" | "teal";
}

export function SectionLabel({ children, className, color = "magenta" }: SectionLabelProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] mb-4",
        color === "magenta" ? "text-magenta" : "text-teal",
        className
      )}
    >
      <span
        className={cn(
          "inline-block w-6 h-px",
          color === "magenta" ? "bg-magenta" : "bg-teal"
        )}
      />
      {children}
    </span>
  );
}
