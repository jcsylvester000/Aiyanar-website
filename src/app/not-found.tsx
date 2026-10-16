import Link from "next/link";
import type { Metadata } from "next";
import { mainNav } from "@/content/navigation";
import { site } from "@/content/site";
import { SearchJump } from "@/components/sections/search-jump";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };

/** P55: recover visitors arriving from old or mistyped links. */
export default function NotFound() {
  return (
    <section className="container-site section-y text-center">
      <p className="eyebrow text-gold-ink">404</p>
      <h1 className="mt-3 text-[length:var(--text-h1)]">This page drifted off with the tide.</h1>
      <p className="mx-auto mt-4 max-w-md">The page you’re looking for has moved or no longer exists. Try one of these instead.</p>
      <div className="mt-8"><SearchJump /></div>
      <nav aria-label="Popular pages" className="mx-auto mt-8 max-w-2xl">
        <ul className="flex flex-wrap justify-center gap-2">
          {mainNav.map((n) => (
            <li key={n.href}>
              <Link href={n.href} className="btn btn-secondary">{n.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <p className="mt-8 text-sm">
        Or call us on{" "}
        <a className="font-medium text-navy underline decoration-gold decoration-2" href={`tel:${site.phones[0].e164}`}>
          {site.phones[0].display}
        </a>
        .
      </p>
      <Link className="btn btn-primary mt-6" href="/">Back to home</Link>
    </section>
  );
}
