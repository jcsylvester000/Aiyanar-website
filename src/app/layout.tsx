import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { playfair, poppins } from "./fonts";
import { allowIndexing, gtmId, siteUrl } from "@/lib/env";
import { site } from "@/content/site";
import { JsonLd, resortLd, websiteLd } from "@/lib/jsonld";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { FloatingContact } from "@/components/layout/floating-contact";
import { ConsentManager } from "@/components/consent/consent-manager";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${site.name} | ${site.descriptor}, Batangas`, template: `%s | ${site.name}` },
  description: "Learn to dive in a 15-ft sea-view pool, dive Anilao’s macro sites with a PADI 5 Star team, and end every day at the sunset bar.",
  applicationName: site.name,
  robots: allowIndexing ? undefined : { index: false, follow: false },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0e1f3f",
  width: "device-width",
  initialScale: 1,
};

/**
 * Root layout: skip link, header (menu, Book Now, docked booking bar), page, footer, floating contact and,
 * once a GTM container is configured, the consent banner (FR-G1 to FR-G5).
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-PH" suppressHydrationWarning className={`${playfair.variable} ${poppins.variable}`}>
      <body suppressHydrationWarning className="flex min-h-dvh flex-col pb-[72px] antialiased lg:pb-0">
        <a href="#main" className="sr-only z-50 rounded-[var(--radius-btn)] bg-navy px-4 py-3 text-white focus:not-sr-only focus:fixed focus:left-3 focus:top-3">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
        <FloatingContact />
        {gtmId ? <ConsentManager gtmId={gtmId} /> : null}
        <JsonLd data={[resortLd(), websiteLd()]} />
      </body>
    </html>
  );
}
