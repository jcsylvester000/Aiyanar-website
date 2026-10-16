import { cn } from "@/lib/cn";

/** Eyebrow + H2 + optional intro, used at the top of every content section. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  onDark,
  align = "left",
  className,
}: {
  id: string;
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  onDark?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-2xl", className)}>
      {eyebrow ? <p className={cn("eyebrow", onDark ? "text-gold" : "text-gold-ink")}>{eyebrow}</p> : null}
      <h2 id={id} className={cn("mt-3 text-[length:var(--text-h2)]", onDark && "text-white")}>
        {title}
      </h2>
      {intro ? <div className={cn("mt-4 text-lead", onDark ? "text-white/85" : "")}>{intro}</div> : null}
    </div>
  );
}
