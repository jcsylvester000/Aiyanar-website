import Image from "next/image";
import Link from "next/link";
import { images } from "@/content/images";
import { publishedPeople } from "@/content/people";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";

export const metadata = pageMetadata({
  title: "Our Team",
  description: "Meet the Aiyanar team: PADI instructors and dive guides, kitchen and front-of-house staff that guests mention in nearly every review.",
  path: "/about/team/",
});

const roles = [
  ["Dive guides", "Spotters with sharp eyes for pygmy seahorses and patience for photographers."],
  ["PADI instructors", "Calm teachers who start every course in our 15-ft dive pool."],
  ["Kitchen", "Breakfast before the boats, long lunches, and dinners as the lights come on."],
  ["Front of house", "The people who remember your name, your coffee and your dive plan."],
] as const;

/** P40 Team. Named staff appear once they approve their profiles and portraits are shot. */
export default function TeamPage() {
  const team = publishedPeople("team");
  return (
    <>
      <PageHero
        image="diveBriefing"
        eyebrow="About · Team"
        title="The people our guests write about"
        intro="Reviews mention our staff and dive guides more than anything else. Here’s who does what."
        crumbs={[{ name: "About", path: "/about/" }, { name: "Team", path: "/about/team/" }]}
      />

      <section aria-labelledby="roles-title" className="section-y">
        <div className="container-site">
          <SectionHeading id="roles-title" eyebrow="Our team" title="Who looks after you" />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {roles.map(([t, d]) => (
              <li key={t} className="rounded-[var(--radius-card)] border border-line bg-white p-6">
                <h3 className="text-[length:var(--text-h4)]">{t}</h3>
                <p className="mt-2 text-[15px]">{d}</p>
              </li>
            ))}
          </ul>
          {team.length ? (
            <ul className="mt-12 grid gap-6 sm:grid-cols-3">
              {team.map((p) => <li key={p.name}><p className="font-display text-xl text-navy">{p.name}</p><p className="text-sm">{p.role}</p></li>)}
            </ul>
          ) : null}
        </div>
      </section>

      <section aria-labelledby="train-title" className="section-y bg-navy text-white">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="reveal relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]">
            <Image src={images.padiClass.src} alt={images.padiClass.alt} fill placeholder="blur" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <SectionHeading id="train-title" onDark eyebrow="Training" title="Safety first, every dive" intro="Our staff are trained in CPR, Oxygen Provider and Emergency First Response, and we train local Divemaster scholars with The Pink Argonauts." />
            <Link href="/dive/dive-centre/" className="btn btn-primary mt-8">How we run every dive</Link>
          </div>
        </div>
      </section>
    </>
  );
}
