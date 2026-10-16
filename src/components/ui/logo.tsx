import Image from "next/image";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Interim raster logo (vector master requested from the resort, open question Q8).
 * Branding Kit §4: white on navy/photography, navy on sand; never below 120 px wide.
 */
export function Logo({ tone = "navy", className, priority }: { tone?: "white" | "navy"; className?: string; priority?: boolean }) {
  return (
    <Image
      src={tone === "white" ? "/brand/logo-white.png" : "/brand/logo-navy.png"}
      alt={site.name}
      width={727}
      height={414}
      priority={priority}
      sizes="140px"
      className={cn("h-auto w-[120px] lg:w-[132px]", className)}
    />
  );
}
