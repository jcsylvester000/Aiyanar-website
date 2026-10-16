import Image from "next/image";
import type { Course } from "@/content/dive";
import { images } from "@/content/images";
import { PriceFrom } from "@/components/ui/price-from";

/** PADI course card (BRD 2.4 Learn to Dive: price, duration, minimum age). */
export function CourseCard({ course, href }: { course: Course; href?: string }) {
  const img = images[course.image];
  return (
    <article id={course.slug} className="group relative flex scroll-mt-28 flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white">
      <div className="relative aspect-[16/9]">
        <Image src={img.src} alt={img.alt} fill placeholder="blur" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-navy">{course.level}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[length:var(--text-h4)]">
          {href ? <a href={href} className="after:absolute after:inset-0 focus-visible:outline-none">{course.name}</a> : course.name}
        </h3>
        <p className="mt-2 text-[15px]">{course.summary}</p>
        <dl className="mt-4 grid grid-cols-[6.5rem_1fr] gap-x-3 gap-y-1 text-sm">
          <dt className="font-medium text-navy">Minimum age</dt>
          <dd>{course.minAge}</dd>
          <dt className="font-medium text-navy">Duration</dt>
          <dd>{course.duration}</dd>
          <dt className="font-medium text-navy">You need</dt>
          <dd>{course.prerequisites}</dd>
        </dl>
        <div className="mt-auto pt-5">
          <PriceFrom price={course.price} className="border-t border-line pt-4" />
        </div>
      </div>
    </article>
  );
}
