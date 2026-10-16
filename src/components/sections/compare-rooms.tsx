import Link from "next/link";
import type { Room } from "@/content/rooms";
import { formatPHP } from "@/content/schema";

const rows: { label: string; get: (r: Room) => string }[] = [
  { label: "Size", get: (r) => `${r.sqm} sqm` },
  { label: "Beds", get: (r) => r.beds },
  { label: "View", get: (r) => r.view },
  { label: "Balcony", get: (r) => (r.balcony === "private" ? "Private" : "Shared") },
  { label: "Where", get: (r) => r.location },
  { label: "Stairs", get: (r) => r.access },
  { label: "Rooms of this type", get: (r) => (r.units ? String(r.units) : "Ask us") },
  { label: "From", get: (r) => (r.fromPrice ? `${formatPHP(r.fromPrice)} ${r.fromPrice.basis}` : "Rates on request") },
];

/** Room comparison (BRD FR-R2): a real table side by side from 768 px, stacked cards below. */
export function CompareRooms({ rooms }: { rooms: Room[] }) {
  return (
    <>
      <div className="hidden overflow-hidden rounded-[var(--radius-card)] border border-line bg-white md:block">
        <table className="w-full table-fixed text-left text-[15px]">
          <caption className="sr-only">Compare Suite, Deluxe and Casita rooms</caption>
          <thead>
            <tr className="bg-navy text-white">
              <td className="w-44 p-4" />
              {rooms.map((r) => (
                <th key={r.slug} scope="col" className="p-4 font-display text-2xl font-normal">
                  <Link href={`/stay/${r.slug}/`} className="hover:text-gold">{r.name}</Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t border-line align-top">
                <th scope="row" className="w-44 p-4 font-medium text-navy">{row.label}</th>
                {rooms.map((r) => (
                  <td key={r.slug} className="p-4">{row.get(r)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="space-y-4 md:hidden">
        {rooms.map((r) => (
          <li key={r.slug} className="rounded-[var(--radius-card)] border border-line bg-white p-5">
            <p className="font-display text-2xl text-navy"><Link href={`/stay/${r.slug}/`}>{r.name}</Link></p>
            <dl className="mt-3 grid grid-cols-[8rem_1fr] gap-x-3 gap-y-2 text-sm">
              {rows.map((row) => (
                <div key={row.label} className="contents">
                  <dt className="font-medium text-navy">{row.label}</dt>
                  <dd>{row.get(r)}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
}
