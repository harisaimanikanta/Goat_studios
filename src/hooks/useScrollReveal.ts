import { useEffect, useRef, useState } from "react";

export function useScrollReveal(threshold = 0.15, triggerOnce = true) {
  const [isRevealed, setIsRevealed] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsRevealed(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -10% 0px", // triggers slightly before fully in view
      }
    );

    observer.observe(element);

    return () => {
      if (element && !triggerOnce) {
        observer.unobserve(element);
      }
    };
  }, [threshold, triggerOnce]);

  return { ref, isRevealed };
}
