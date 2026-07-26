import React from "react";
import { useMagnetic } from "../../hooks/useMagnetic";
import "./MagneticButton.css";

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: (e: any) => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  href?: string;
  strength?: number;
}

export default function MagneticButton({
  children,
  onClick,
  type = "button",
  className = "",
  href,
  strength = 0.3,
}: MagneticButtonProps) {
  const magneticRef = useMagnetic(strength);

  const innerContent = (
    <>
      <span className="relative z-10">{children}</span>
      <div className="magnetic-btn-glow" />
    </>
  );

  if (href) {
    return (
      <span className="magnetic-button-wrap">
        <a
          ref={magneticRef as React.RefObject<HTMLAnchorElement>}
          href={href}
          onClick={onClick}
          className={`magnetic-btn ${className}`}
          data-magnetic="true"
        >
          {innerContent}
        </a>
      </span>
    );
  }

  return (
    <span className="magnetic-button-wrap">
      <button
        ref={magneticRef as React.RefObject<HTMLButtonElement>}
        type={type}
        onClick={onClick}
        className={`magnetic-btn ${className}`}
        data-magnetic="true"
      >
        {innerContent}
      </button>
    </span>
  );
}
