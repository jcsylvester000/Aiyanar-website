import { formatPHP, type Price } from "@/content/schema";
import { cn } from "@/lib/cn";

/** "from ₱x per …" or, until the rate card arrives (D5), an honest "Rates on request". */
export function PriceFrom({ price, className, onDark }: { price: Price; className?: string; onDark?: boolean }) {
  if (!price)
    return (
      <p className={cn("text-sm", onDark ? "text-white/80" : "text-charcoal", className)}>
        <span className={cn("font-medium", onDark ? "text-white" : "text-navy")}>Rates on request</span> · live prices on the next step
      </p>
    );
  return (
    <p className={cn("text-sm", className)}>
      From <span className={cn("font-display text-2xl", onDark ? "text-white" : "text-navy")}>{formatPHP(price)}</span> {price.basis}
    </p>
  );
}
