// Custom smooth-scroll with a controllable duration.
// Used ONLY for #consultation navigation, so the rest of the site keeps its
// default (browser) scroll behavior and speed.
export function smoothScrollToId(
  id: string,
  opts: { duration?: number; offset?: number } = {}
): void {
  const el = document.getElementById(id);
  if (!el) return;

  const duration = opts.duration ?? 350; // ms — fast but still smooth (300–400ms range)
  const offset = opts.offset ?? 100;      // sticky navbar offset so the heading isn't covered

  const startY = window.scrollY;
  const targetY = el.getBoundingClientRect().top + startY - offset;
  const distance = targetY - startY;
  if (Math.abs(distance) < 1) return;

  const easeInOutQuad = (t: number): number =>
    t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  let startTime: number | null = null;
  const step = (now: number) => {
    if (startTime === null) startTime = now;
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * easeInOutQuad(progress));
    if (elapsed < duration) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
