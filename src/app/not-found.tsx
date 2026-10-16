import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };

/** P55: recover visitors arriving from old links. B1 adds search and popular links. */
export default function NotFound() {
  return (
    <section className="container-site section-y text-center">
      <p className="eyebrow text-gold-ink">404</p>
      <h1 className="mt-3 text-[length:var(--text-h1)]">This page drifted off with the tide.</h1>
      <p className="mx-auto mt-4 max-w-md">The page you’re looking for has moved or no longer exists.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link className="btn btn-primary" href="/">Back to home</Link>
        <a className="btn btn-secondary" href={`tel:${site.phones[0].e164}`}>Call {site.phones[0].display}</a>
      </div>
    </section>
  );
}
