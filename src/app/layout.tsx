import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { OrganizationJsonLd } from "@/components/ui/organization-json-ld";
import "../styles/globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.calpolyvibecoding.com"),
  title: {
    default: "Vibe Coding Club | Cal Poly SLO",
    template: "%s | Vibe Coding Club — Cal Poly SLO",
  },
  description:
    "Cal Poly SLO's AI and vibe coding club. Weekly workshops, hackathons, and a community turning ideas into real projects with AI. No experience required.",
  keywords: [
    "Cal Poly vibe coding",
    "Cal Poly SLO clubs",
    "AI coding club",
    "vibe coding club",
    "Cal Poly AI club",
    "Cal Poly student organizations",
    "learn AI Cal Poly",
    "San Luis Obispo coding club",
    "CPVC",
  ],
  authors: [{ name: "Cal Poly Vibe Coding Club" }],
  creator: "Cal Poly Vibe Coding Club",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.calpolyvibecoding.com",
    siteName: "Cal Poly Vibe Coding Club",
    title: "Vibe Coding Club | Cal Poly SLO",
    description:
      "Cal Poly SLO's AI and vibe coding club. Weekly workshops, hackathons, and a community turning ideas into real projects with AI. No experience required.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cal Poly Vibe Coding Club",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibe Coding Club | Cal Poly SLO",
    description:
      "Cal Poly SLO's AI and vibe coding club. Weekly workshops, hackathons, and a community turning ideas into real projects with AI. No experience required.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/assets/CPVC_Diamond.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${jetbrainsMono.variable} bg-neutral-0 text-neutral-900 antialiased`}>
        <OrganizationJsonLd />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
