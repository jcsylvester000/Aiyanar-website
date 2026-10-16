import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon } from "./icon";

/**
 * Direct contact channels from site.ts (FR-C1). Used where a form will go once lead capture resumes
 * (events, corporate, transfers, contact). `subject` pre-fills the email subject only, no personal data.
 */
export function ContactBlock({ subject, email = site.emails.info, onDark, className }: { subject?: string; email?: string; onDark?: boolean; className?: string }) {
  const item = cn("flex min-h-12 items-center gap-3 rounded-[var(--radius-btn)] border px-4 transition-colors", onDark ? "border-white/25 text-white hover:bg-white/10" : "border-line bg-white text-navy hover:border-navy");
  const iconCls = cn("size-5 shrink-0", onDark ? "text-gold" : "text-gold-ink");
  const mail = `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
  return (
    <ul className={cn("grid gap-3 sm:grid-cols-2", className)}>
      {site.phones.map((p) => (
        <li key={p.e164}>
          <a href={`tel:${p.e164}`} className={item} data-event="contact_click" data-channel="call">
            <Icon name="phone" className={iconCls} />
            <span>{p.display} <span className="text-sm opacity-75">· {p.label}</span></span>
          </a>
        </li>
      ))}
      <li>
        <a href={mail} className={item} data-event="contact_click" data-channel="email">
          <Icon name="mail" className={iconCls} />
          <span className="break-all">{email}</span>
        </a>
      </li>
      <li>
        <a href={site.messengerUrl} rel="noopener" target="_blank" className={item} data-event="contact_click" data-channel="messenger">
          <Icon name="messenger" className={iconCls} />
          <span>Messenger<span className="sr-only"> (opens in a new tab)</span></span>
        </a>
      </li>
      {site.whatsapp ? (
        <li>
          <a href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`} rel="noopener" target="_blank" className={item} data-event="contact_click" data-channel="whatsapp">
            <Icon name="whatsapp" className={iconCls} />
            <span>WhatsApp<span className="sr-only"> (opens in a new tab)</span></span>
          </a>
        </li>
      ) : null}
    </ul>
  );
}
