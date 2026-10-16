import type { SVGProps } from "react";

/** Inline SVG icons (no icon library: smaller bundle). 24×24 grid, stroke icons inherit currentColor. */
const paths = {
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  chevronRight: <path d="M9 6l6 6-6 6" />,
  chevronDown: <path d="M6 9l6 6 6-6" />,
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
} as const;

/** Brand marks (filled). */
const marks = {
  messenger: (
    <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.15.26.35.27.57l.05 1.78a.8.8 0 0 0 1.12.71l1.99-.88a.8.8 0 0 1 .53-.04c.91.25 1.88.39 2.9.39 5.64 0 10-4.13 10-9.7S17.64 2 12 2Zm6 7.46-2.94 4.67a1.5 1.5 0 0 1-2.17.4l-2.34-1.76a.6.6 0 0 0-.72 0l-3.16 2.4c-.42.32-.97-.18-.69-.63l2.94-4.67a1.5 1.5 0 0 1 2.17-.4l2.34 1.76a.6.6 0 0 0 .72 0l3.16-2.4c.42-.32.97.18.69.63Z" />
  ),
  whatsapp: (
    <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.17-1.5A9.9 9.9 0 1 0 12.04 2Zm5.77 14.05c-.24.68-1.42 1.3-1.95 1.35-.5.05-.98.23-3.3-.69-2.8-1.1-4.56-3.97-4.7-4.15-.13-.18-1.12-1.49-1.12-2.85 0-1.35.71-2.02.96-2.3.25-.27.55-.34.73-.34h.52c.17 0 .4-.06.62.47.24.56.8 1.93.87 2.07.07.14.12.3.02.48-.1.18-.14.3-.28.46l-.42.48c-.14.14-.28.29-.12.57.16.27.72 1.18 1.54 1.91 1.06.94 1.95 1.23 2.23 1.37.27.14.44.12.6-.07.16-.18.69-.8.88-1.08.18-.27.37-.23.62-.14.25.1 1.6.75 1.88.89.27.14.46.2.53.32.06.11.06.66-.18 1.3Z" />
  ),
  facebook: <path d="M14 8h3V4h-3c-2.76 0-4 1.79-4 4.5V11H7v4h3v7h4v-7h3l1-4h-4V8.6c0-.4.27-.6.6-.6Z" />,
  instagram: (
    <path d="M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm4.9-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM21 8.1c-.1-1.5-.4-2.8-1.5-3.9S17.1 2.8 15.6 2.7C14.1 2.6 9.9 2.6 8.4 2.7 6.9 2.8 5.6 3.1 4.5 4.2S3.1 6.6 3 8.1c-.1 1.5-.1 5.7 0 7.2.1 1.5.4 2.8 1.5 3.9s2.4 1.4 3.9 1.5c1.5.1 5.7.1 7.2 0 1.5-.1 2.8-.4 3.9-1.5s1.4-2.4 1.5-3.9c.1-1.5.1-5.7 0-7.2Zm-2 9a3 3 0 0 1-1.7 1.7c-1.2.5-3.9.4-5.3.4s-4.1.1-5.3-.4A3 3 0 0 1 5 17.1c-.5-1.2-.4-3.9-.4-5.1s-.1-4 .4-5.1A3 3 0 0 1 6.7 5.2C7.9 4.7 10.6 4.8 12 4.8s4.1-.1 5.3.4A3 3 0 0 1 19 6.9c.5 1.2.4 3.9.4 5.1s.1 4-.4 5.1Z" />
  ),
} as const;

export type IconName = keyof typeof paths | keyof typeof marks;

export function Icon({ name, className = "size-5", ...rest }: { name: IconName } & SVGProps<SVGSVGElement>) {
  const isMark = name in marks;
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill={isMark ? "currentColor" : "none"}
      stroke={isMark ? "none" : "currentColor"}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {isMark ? marks[name as keyof typeof marks] : paths[name as keyof typeof paths]}
    </svg>
  );
}
