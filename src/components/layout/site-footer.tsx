import Link from "next/link";
import { footerNav } from "@/content/navigation";
import { fullAddress, site } from "@/content/site";
import { gtmId } from "@/lib/env";
import { Icon } from "@/components/ui/icon";
import { Logo } from "@/components/ui/logo";
import { CookieSettingsButton } from "@/components/consent/cookie-settings-button";

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.name}, Mabini, Batangas`)}`;

/**
 * Footer (BRD FR-G4): address + map link, phones, emails, Messenger, socials, policy links.
 * Every contact detail comes from src/content/site.ts. Newsletter sign-up is deferred with lead capture.
 */
export function SiteFooter() {
  const year = 2026;
  return (
    <footer className="bg-navy text-white/85">
      <div className="container-site grid gap-12 py-14 lg:grid-cols-[1.3fr_2fr] lg:py-20">
        <div className="space-y-6">
          <Logo tone="white" />
          <p className="max-w-sm font-display text-xl text-white">{site.claim}</p>
          <ul className="space-y-1 text-[15px]">
            <li>
              <a href={mapsUrl} rel="noopener" target="_blank" className="flex min-h-11 items-start gap-3 py-2 hover:text-gold">
                <Icon name="pin" className="mt-0.5 size-5 shrink-0 text-gold" />
                <span>
                  {fullAddress}
                  <span className="block text-sm text-white/70">Open in Google Maps<span className="sr-only"> (opens in a new tab)</span></span>
                </span>
              </a>
            </li>
            {site.phones.map((p) => (
              <li key={p.e164}>
                <a href={`tel:${p.e164}`} className="flex min-h-11 items-center gap-3 hover:text-gold" data-event="contact_click" data-channel="call">
                  <Icon name="phone" className="size-5 shrink-0 text-gold" />
                  {p.display} <span className="text-sm text-white/70">· {p.label}</span>
                </a>
              </li>
            ))}
            {[site.emails.reservations, site.emails.info].map((e) => (
              <li key={e}>
                <a href={`mailto:${e}`} className="flex min-h-11 items-center gap-3 hover:text-gold" data-event="contact_click" data-channel="email">
                  <Icon name="mail" className="size-5 shrink-0 text-gold" />
                  {e}
                </a>
              </li>
            ))}
            <li>
              <a href={site.messengerUrl} rel="noopener" target="_blank" className="flex min-h-11 items-center gap-3 hover:text-gold" data-event="contact_click" data-channel="messenger">
                <Icon name="messenger" className="size-5 shrink-0 text-gold" />
                Messenger: AiyanarAnilao<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <p className="eyebrow text-gold">{group.title}</p>
              <ul className="mt-4 space-y-1 text-[15px]">
                {group.items.map((it) => (
                  <li key={it.href}>
                    <Link href={it.href} className="inline-flex min-h-11 items-center hover:text-gold">
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container-site flex flex-col gap-4 py-6 text-sm text-white/75 md:flex-row md:items-center md:justify-between lg:pr-24">
          <p>
            © {year} {site.legalName} · PADI 5 Star Dive Resort
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <Link href="/policies/privacy/" className="inline-flex min-h-11 items-center hover:text-gold">Privacy</Link>
            <Link href="/policies/" className="inline-flex min-h-11 items-center hover:text-gold">Policies</Link>
            {gtmId ? <CookieSettingsButton /> : null}
            <span className="flex items-center gap-1">
              {site.socials.map((s) => (
                <a key={s.url} href={s.url} rel="noopener" target="_blank" aria-label={`${s.name} (opens in a new tab)`} className="grid size-11 place-items-center hover:text-gold">
                  <Icon name={s.name.toLowerCase() === "facebook" ? "facebook" : "instagram"} className="size-5" />
                </a>
              ))}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
