import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { buildSearchIndex } from "@/lib/search-index";
import { PlainHeader } from "@/components/sections/plain-header";
import { SiteSearch } from "@/components/sections/site-search";

const base = pageMetadata({ title: "Search", description: "Search the Aiyanar website.", path: "/search/" });
export const metadata: Metadata = { ...base, robots: { index: false, follow: true } };
export const revalidate = 86400;

/** P53 Site search (FR-G6), noindex. */
export default function SearchPage() {
  return (
    <>
      <PlainHeader title="Search" crumbs={[{ name: "Search", path: "/search/" }]} />
      <section aria-label="Search" className="section-y">
        <div className="container-site max-w-3xl">
          <SiteSearch index={buildSearchIndex()} />
        </div>
      </section>
    </>
  );
}
