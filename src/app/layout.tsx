import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { playfair, poppins } from "./fonts";
import { allowIndexing, siteUrl } from "@/lib/env";
import { site } from "@/content/site";
import { JsonLd, resortLd, websiteLd } from "@/lib/jsonld";

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
 * Root layout. B1 adds the header (menu + Book Now), sticky booking bar, floating contact, footer and consent banner.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-PH" suppressHydrationWarning className={`${playfair.variable} ${poppins.variable}`}>
      <body suppressHydrationWarning className="flex min-h-dvh flex-col antialiased">
        <main id="main" className="flex-1">
          {children}
        </main>
        <JsonLd data={[resortLd(), websiteLd()]} />
      </body>
    </html>
  );
}
