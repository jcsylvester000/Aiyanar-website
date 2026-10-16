import Link from "next/link";
import { months } from "@/content/anilao";
import { factById } from "@/content/facts";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/cn";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";

export const metadata = pageMetadata({
  title: "Anilao Weather & Dive Conditions by Month",
  description: "The best time to visit Anilao: peak dive months, the wet season, water temperature (26–29 °C) and what each month is like for divers and non-divers.",
  path: "/anilao/weather-by-month/",
});

const badge: Record<string, string> = {
  Peak: "bg-navy text-white",
  Good: "bg-gold text-navy",
  "Wet season": "border border-navy/30 text-navy",
};

/** P33 Weather by month: qualitative guide; no invented monthly figures. */
export default function WeatherPage() {
  return (
    <>
      <PageHero
        image="poolSunset"
        eyebrow="Anilao guide · Weather"
        title="Anilao by month"
        intro={`${factById("season").value}. Water stays ${factById("water-temp").value} year-round.`}
        crumbs={[{ name: "Anilao guide", path: "/anilao/" }, { name: "Weather by month", path: "/anilao/weather-by-month/" }]}
      />

      <section aria-labelledby="months-title" className="section-y">
        <div className="container-site">
          <SectionHeading
            id="months-title"
            eyebrow="Month by month"
            title="When to go"
            intro="Most tropical storms reach the Philippines between July and October. That’s when our pool comes into its own: courses carry on, and boat dives go out whenever the sea is safe."
          />
          <div className="mt-10 overflow-x-auto rounded-[var(--radius-card)] border border-line bg-white" tabIndex={0} role="region" aria-label="Anilao months table, scrolls sideways on small screens">
            <table className="w-full min-w-[640px] text-left text-[15px]">
              <caption className="sr-only">Anilao conditions by month for divers and other guests</caption>
              <thead className="bg-navy text-white">
                <tr>
                  <th scope="col" className="p-4 font-medium">Month</th>
                  <th scope="col" className="p-4 font-medium">Season</th>
                  <th scope="col" className="p-4 font-medium">For divers</th>
                  <th scope="col" className="p-4 font-medium">For everyone</th>
                </tr>
              </thead>
              <tbody>
                {months.map((m) => (
                  <tr key={m.month} className="border-t border-line align-top">
                    <th scope="row" className="p-4 font-display text-lg font-normal text-navy">{m.month}</th>
                    <td className="p-4"><span className={cn("inline-block whitespace-nowrap rounded-full px-3 py-0.5 text-xs font-medium", badge[m.season])}>{m.season}</span></td>
                    <td className="p-4">{m.divers}</td>
                    <td className="p-4">{m.everyone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs">General guidance. Weather varies year to year; check PAGASA forecasts before you travel.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/learn/" className="btn btn-primary">Learn to dive, rain or shine</Link>
            <Link href="/offers/" className="btn btn-secondary">Seasonal offers</Link>
          </div>
        </div>
      </section>
    </>
  );
}
