import localFont from "next/font/local";

/** Brand fonts, self-hosted (SIL Open Font License). Branding Kit §6: Playfair Display + Poppins. */
export const playfair = localFont({
  src: [
    { path: "../fonts/playfair-display-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/playfair-display-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/playfair-display-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-playfair",
  display: "swap",
  // Preloaded (both families): hero text re-wraps on swap and shifts the page (CLS 0.18 on /learn/ without it).
  fallback: ["Georgia", "serif"],
});

/** Poppins 300 body, 400, 500 emphasis/buttons. 600 removed (unused) to cut a preload. */
export const poppins = localFont({
  src: [
    { path: "../fonts/poppins-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "../fonts/poppins-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/poppins-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});
