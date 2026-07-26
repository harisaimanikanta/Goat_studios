import { useRef, useEffect } from "react";

export function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const elemCenterX = rect.left + rect.width / 2;
      const elemCenterY = rect.top + rect.height / 2;

      // Distance between mouse and element center
      const deltaX = e.clientX - elemCenterX;
      const deltaY = e.clientY - elemCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Trigger radius
      const triggerRadius = rect.width * 1.5;

      if (distance < triggerRadius) {
        // Apply magnetic pull with easing strength
        const pullX = deltaX * strength;
        const pullY = deltaY * strength;
        
        element.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
        element.style.transition = "transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)";
      } else {
        // Release
        element.style.transform = "translate3d(0px, 0px, 0)";
        element.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
      }
    };

    const handleMouseLeave = () => {
      element.style.transform = "translate3d(0px, 0px, 0)";
      element.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
    };

    window.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return ref;
}
