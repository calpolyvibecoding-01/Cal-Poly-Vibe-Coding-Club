export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const STICKY_HEADER_BAR_SELECTOR = "[data-sticky-header-bar]";
const DEFAULT_SCROLL_GAP = 24;
const FALLBACK_HEADER_HEIGHT = 88;

function getDefaultScrollOffset() {
  if (typeof window === "undefined") {
    return 0;
  }

  const stickyHeaderBar = document.querySelector<HTMLElement>(
    STICKY_HEADER_BAR_SELECTOR
  );
  const headerHeight =
    stickyHeaderBar?.getBoundingClientRect().height ?? FALLBACK_HEADER_HEIGHT;

  return Math.ceil(headerHeight + DEFAULT_SCROLL_GAP);
}

export function smoothScrollToHash(hash: string, offset?: number) {
  if (typeof window === "undefined") {
    return;
  }

  const target = document.querySelector(hash);
  if (target) {
    const resolvedOffset =
      offset ?? (hash === "#about" ? getDefaultScrollOffset() : 0);
    const top =
      target.getBoundingClientRect().top + window.scrollY - resolvedOffset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}
