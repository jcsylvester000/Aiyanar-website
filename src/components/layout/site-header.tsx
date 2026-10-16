"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav, bookNow, isHeroRoute } from "@/content/navigation";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/ui/logo";
import { Icon } from "@/components/ui/icon";
import { BookingSearch } from "@/components/booking/booking-search";
import { MobileMenu } from "./mobile-menu";

/**
 * Site header (BRD FR-G1, 2.7):
 * - logo, 7-item menu and gold Book Now on every page; hamburger below 1024 px;
 * - on hero pages it starts transparent with the white logo and turns solid (navy logo on sand) on scroll;
 * - from 1024 px a compact booking bar docks under the header once the visitor scrolls past the first screen (FR-G2).
 */
export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const isHero = isHeroRoute(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setShowBar(y > (isHero ? window.innerHeight * 0.8 : 480));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHero]);

  const onDark = isHero && !scrolled;
  const hideBar = pathname.startsWith("/book");

  return (
    <header
      className={cn(
        "inset-x-0 top-0 z-40 transition-colors duration-300",
        isHero ? "fixed" : "sticky",
        onDark ? "bg-gradient-to-b from-navy/60 to-transparent" : "border-b border-line bg-sand/95 shadow-[0_1px_0_rgb(14_31_63/0.04)] backdrop-blur",
      )}
    >
      <div className="container-site flex h-[76px] items-center justify-between gap-4 lg:h-[84px]">
        <Link href="/" aria-label={`${site.name}, home`} className="shrink-0">
          <Logo tone={onDark ? "white" : "navy"} priority />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {mainNav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex min-h-11 items-center px-2.5 text-[15px] font-normal transition-colors xl:px-3",
                      "after:absolute after:inset-x-2.5 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform hover:after:scale-x-100",
                      active && "after:scale-x-100",
                      onDark ? "text-white" : "text-navy",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/search/" aria-label="Search" className={cn("grid size-11 place-items-center", onDark ? "text-white" : "text-navy")}>
            <Icon name="search" className="size-5" />
          </Link>
          <Link href={bookNow.href} className="btn btn-primary hidden px-5 sm:inline-flex">
            {bookNow.label}
          </Link>
          <MobileMenu onDark={onDark} />
        </div>
      </div>

      {!hideBar ? (
        <div
          aria-hidden={!showBar}
          inert={!showBar}
          className={cn(
            "hidden border-t border-line bg-sand/95 backdrop-blur transition-all duration-300 lg:block",
            showBar ? "opacity-100" : "pointer-events-none h-0 overflow-hidden border-transparent opacity-0",
          )}
        >
          <div className="container-site flex items-center gap-6 py-3">
            <p className="hidden shrink-0 font-display text-lg text-navy xl:block">Plan your stay</p>
            <BookingSearch layout="bar" className="flex-1 lg:grid-cols-[1fr_1fr_auto]" />
          </div>
        </div>
      ) : null}
    </header>
  );
}
