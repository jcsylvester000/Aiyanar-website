import type { Metadata } from "next";
import Link from "next/link";
import { publishedPeople } from "@/content/people";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";

const base = pageMetadata({
  title: "Friends of Aiyanar",
  description: "World-renowned underwater photographers who have stayed and dived with us in Anilao.",
  path: "/about/friends-of-aiyanar/",
});

/** Stays out of search and navigation until at least one guest has consented to be named (Q4, decision D7). */
export const metadata: Metadata = publishedPeople("friend").length ? base : { ...base, robots: { index: false, follow: true } };

/** P41 Friends of Aiyanar (publish flag via people.ts). */
export default function FriendsPage() {
  const friends = publishedPeople("friend");
  return (
    <>
      <PageHero
        image="squid"
        eyebrow="About · Friends of Aiyanar"
        title="Photographers who come back"
        intro="Some of the world’s best-known underwater photographers have stayed and dived with us in Anilao."
        crumbs={[{ name: "About", path: "/about/" }, { name: "Friends of Aiyanar", path: "/about/friends-of-aiyanar/" }]}
      />
      <section aria-labelledby="friends-title" className="section-y">
        <div className="container-site">
          <SectionHeading id="friends-title" eyebrow="Friends of Aiyanar" title="Our guests behind the lens" />
          {friends.length ? (
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {friends.map((f) => (
                <li key={f.name} className="rounded-[var(--radius-card)] border border-line bg-white p-6">
                  <p className="font-display text-2xl text-navy">{f.name}</p>
                  <p className="mt-1 text-sm">{f.role}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 max-w-xl">Their stories are coming soon.</p>
          )}
          <Link href="/dive/photographers/" className="btn btn-secondary mt-10">The camera room</Link>
        </div>
      </section>
    </>
  );
}
