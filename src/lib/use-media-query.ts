"use client";

import { useEffect, useState } from "react";

function setMediaQueryListener(
  mediaQuery: MediaQueryList,
  listener: () => void,
): () => void {
  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }

  mediaQuery.addListener(listener);
  return () => mediaQuery.removeListener(listener);
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const update = () => {
      setMatches(mediaQuery.matches);
    };

    update();

    return setMediaQueryListener(mediaQuery, update);
  }, [query]);

  return matches;
}
