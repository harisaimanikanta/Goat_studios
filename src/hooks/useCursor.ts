import { useEffect, useState } from "react";

export interface CursorState {
  x: number;
  y: number;
  isHovered: boolean;
  isClicked: boolean;
  isVisible: boolean;
}

export function useCursor() {
  const [position, setPosition] = useState<CursorState>({
    x: 0,
    y: 0,
    isHovered: false,
    isClicked: false,
    isVisible: false,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition((prev) => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
        isVisible: true,
      }));
    };

    const handleMouseDown = () => {
      setPosition((prev) => ({ ...prev, isClicked: true }));
    };

    const handleMouseUp = () => {
      setPosition((prev) => ({ ...prev, isClicked: false }));
    };

    const handleMouseLeave = () => {
      setPosition((prev) => ({ ...prev, isVisible: false }));
    };

    const handleMouseEnter = () => {
      setPosition((prev) => ({ ...prev, isVisible: true }));
    };

    // Global listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    // Setup hover listeners for buttons, links and magnetic elements
    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[data-magnetic]") ||
        target.classList.contains("interactive-hover");

      setPosition((prev) => ({ ...prev, isHovered: !!isInteractive }));
    };

    window.addEventListener("mouseover", updateHoverState);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", updateHoverState);
    };
  }, []);

  return position;
}
