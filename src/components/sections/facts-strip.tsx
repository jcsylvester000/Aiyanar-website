import { cn } from "@/lib/cn";

/** Big-number facts row. Numbers are plain text (no tickers inside claims). */
export function FactsStrip({ items, onDark, className }: { items: [string, string][]; onDark?: boolean; className?: string }) {
  return (
    <dl className={cn("grid grid-cols-2 gap-6 md:grid-cols-4", className)}>
      {items.map(([n, t]) => (
        <div key={t} className={cn("border-t pt-4", onDark ? "border-white/15" : "border-line")}>
          <dt className="sr-only">{t}</dt>
          <dd>
            <span className={cn("block font-display text-4xl", onDark ? "text-gold" : "text-navy")}>{n}</span>
            <span className={cn("mt-1 block text-sm", onDark ? "text-white/80" : "")}>{t}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
