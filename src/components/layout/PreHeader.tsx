import { Mail, CalendarDays } from "lucide-react";
import Link from "next/link";

export function PreHeader() {
  return (
    <div className="bg-night-50 border-b border-white/5 hidden sm:block">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
        <Link
          href="mailto:info@medyon.de"
          className="flex items-center gap-2 text-text-muted hover:text-text-secondary transition-colors duration-200 text-xs"
        >
          <Mail size={12} />
          <span>info@medyon.de</span>
        </Link>

        <Link
          href="/kontakt"
          className="flex items-center gap-2 text-text-muted hover:text-teal transition-colors duration-200 text-xs"
        >
          <CalendarDays size={12} />
          <span>Termin vereinbaren</span>
        </Link>
      </div>
    </div>
  );
}
