import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { PreHeader } from "@/components/layout/PreHeader";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Medyon – Markenpositionierung für B2B-Unternehmen",
    template: "%s | Medyon",
  },
  description:
    "Markenpositionierung, die wirkt. Medyon verbindet Strategie, Design und digitale Werbung für B2B-Unternehmen, die mehr als nur sichtbar sein wollen.",
  metadataBase: new URL("https://medyon.de"),
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Medyon",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={plusJakartaSans.variable}>
      <body className="antialiased">
        <PreHeader />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
