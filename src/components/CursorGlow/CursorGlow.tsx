import { useCursor } from "../../hooks/useCursor";
import "./CursorGlow.css";

export default function CursorGlow() {
  const { x, y, isHovered, isClicked, isVisible } = useCursor();

  // Hide on mobile/touch devices
  const isTouchDevice =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Primary interactive pointer dot */}
      <div
        className={`cursor-glow-container ${isHovered ? "hovered" : ""} ${
          isClicked ? "clicked" : ""
        }`}
        style={{
          transform: `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`,
        }}
      />

      {/* Atmospheric ambient glow tracker */}
      <div
        className={`cursor-ambient-glow ${isHovered ? "hovered" : ""}`}
        style={{
          transform: `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`,
        }}
      />
    </>
  );
}
