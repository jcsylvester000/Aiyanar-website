import Link from "next/link";
import { JsonLd, breadcrumbLd } from "@/lib/jsonld";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/icon";

export type Crumb = { name: string; path: string };

/** Visible breadcrumbs + BreadcrumbList JSON-LD on every page below Home (BRD 1.4). Pass the trail after Home. */
export function Breadcrumbs({ items, onDark, className }: { items: Crumb[]; onDark?: boolean; className?: string }) {
  const muted = onDark ? "text-white/80" : "text-charcoal";
  return (
    <>
      <nav aria-label="Breadcrumb" className={cn("text-[13px]", className)}>
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className={cn("inline-flex min-h-8 items-center hover:underline", muted)}>Home</Link>
          </li>
          {items.map((c, i) => {
            const last = i === items.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-1">
                <Icon name="chevronRight" className={cn("size-3.5", onDark ? "text-white/60" : "text-gold-ink")} />
                {last ? (
                  <span aria-current="page" className={onDark ? "text-white" : "font-medium text-navy"}>{c.name}</span>
                ) : (
                  <Link href={c.path} className={cn("inline-flex min-h-8 items-center hover:underline", muted)}>{c.name}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, ...items])} />
    </>
  );
}
