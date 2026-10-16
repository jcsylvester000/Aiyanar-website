"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { mainNav, bookNow } from "@/content/navigation";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/icon";
import { Logo } from "@/components/ui/logo";

/**
 * Full-screen menu below 1024 px on the native <dialog> (FR-G1): page behind is inert, Escape closes,
 * focus returns to the button, targets ≥ 44 px.
 */
export function MobileMenu({ onDark }: { onDark: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  const pathname = usePathname() ?? "/";

  const open = () => {
    ref.current?.showModal();
    document.documentElement.style.overflow = "hidden";
  };
  const close = () => ref.current?.close();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const onClose = () => (document.documentElement.style.overflow = "");
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, []);

  useEffect(() => {
    ref.current?.close();
  }, [pathname]);

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label="Open menu"
        aria-haspopup="dialog"
        className={cn("grid size-11 place-items-center lg:hidden", onDark ? "text-white" : "text-navy")}
      >
        <Icon name="menu" className="size-7" />
      </button>
      <dialog ref={ref} aria-label="Menu" className="m-0 h-dvh max-h-none w-screen max-w-none bg-sand p-0 text-navy backdrop:bg-navy/50 open:flex open:flex-col">
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-line px-4">
          <Link href="/" onClick={close} aria-label={`${site.name}, home`}>
            <Logo tone="navy" />
          </Link>
          <button type="button" onClick={close} aria-label="Close menu" autoFocus className="grid size-11 place-items-center">
            <Icon name="close" className="size-7" />
          </button>
        </div>
        <nav aria-label="Mobile" className="overflow-y-auto px-4 py-4">
          <ul className="divide-y divide-line">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                  className="flex min-h-14 items-center justify-between font-display text-[26px] text-navy"
                >
                  {item.label}
                  <Icon name="chevronRight" className="size-5 text-gold-ink" />
                </Link>
              </li>
            ))}
          </ul>
          <Link href={bookNow.href} onClick={close} className="btn btn-primary mt-6 w-full">
            {bookNow.label}
          </Link>
        </nav>
        <div className="mt-auto space-y-1 border-t border-line bg-cream px-4 py-5 text-[15px]">
          {site.phones.map((p) => (
            <a key={p.e164} href={`tel:${p.e164}`} className="flex min-h-11 items-center gap-3 text-navy">
              <Icon name="phone" className="size-5 text-gold-ink" />
              {p.display}
            </a>
          ))}
          <a href={site.messengerUrl} rel="noopener" target="_blank" className="flex min-h-11 items-center gap-3 text-navy">
            <Icon name="messenger" className="size-5 text-blue" />
            Message us on Messenger<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </dialog>
    </>
  );
}
