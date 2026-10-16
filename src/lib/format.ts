const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "2026-11-01" -> "1 Nov 2026" (PH/UK day-month order). */
export function shortDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/** "2026-10-16" -> "October 2026" */
export function monthYear(iso: string) {
  const [y, m] = iso.split("-").map(Number);
  return `${LONG[m - 1]} ${y}`;
}
