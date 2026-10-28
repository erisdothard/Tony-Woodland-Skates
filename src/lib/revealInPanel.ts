/* Bring the current thumbnail into view inside its own scrolling panel, and nowhere else.
   Element.scrollIntoView also scrolls every ancestor, the window included, so on load it dragged the
   page down to whichever book or reel sat below the hero. */
export function revealInPanel(panel: HTMLElement | null): void {
  const item = panel?.querySelector<HTMLElement>('[aria-current="true"]');
  if (!panel || !item) return;
  const p = panel.getBoundingClientRect();
  const r = item.getBoundingClientRect();
  const dx = r.left < p.left ? r.left - p.left : r.right > p.right ? r.right - p.right : 0;
  const dy = r.top < p.top ? r.top - p.top : r.bottom > p.bottom ? r.bottom - p.bottom : 0;
  if (dx || dy) panel.scrollBy({ left: dx, top: dy });
}
