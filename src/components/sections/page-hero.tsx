import Image from "next/image";
import { images, type ImageKey } from "@/content/images";
import { Breadcrumbs, type Crumb } from "@/components/layout/breadcrumbs";

/**
 * Inner-page photo hero (dark, full-bleed). The route must be listed in navigation.heroRoutes so the header
 * starts transparent over it. The hero image is the page's LCP: eager + high priority.
 * Mobile floor of 40rem keeps the hero taller than its content, so a font swap cannot change its height (CLS).
 */
export function PageHero({
  image,
  eyebrow,
  title,
  intro,
  crumbs,
  children,
}: {
  image: ImageKey;
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  crumbs: Crumb[];
  children?: React.ReactNode;
}) {
  const img = images[image];
  return (
    <section aria-labelledby="page-title" className="relative isolate flex min-h-[max(62svh,40rem)] items-end overflow-hidden bg-navy text-white lg:min-h-[68svh]">
      <Image src={img.src} alt={img.alt} fill priority fetchPriority="high" sizes="100vw" className="-z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/60 to-navy/40" aria-hidden />
      <div className="container-site pb-12 pt-32 lg:pb-16">
        <Breadcrumbs items={crumbs} onDark className="mb-5" />
        <p className="eyebrow text-gold">{eyebrow}</p>
        <h1 id="page-title" className="mt-3 max-w-3xl text-[length:var(--text-h1)] text-white">{title}</h1>
        {intro ? <div className="mt-4 max-w-2xl text-lead text-white/90">{intro}</div> : null}
        {children ? <div className="mt-7 flex flex-wrap gap-3">{children}</div> : null}
      </div>
    </section>
  );
}
