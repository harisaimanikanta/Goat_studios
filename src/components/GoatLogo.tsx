import React from "react";

interface GoatLogoProps {
  className?: string;
  size?: number;
}

export default function GoatLogo({ className = "w-6 h-6" }: GoatLogoProps) {
  return (
    <img
      src="/logo.png"
      alt="GOAT STUDIOS Logo"
      className={`object-cover ${className}`}
      referrerPolicy="no-referrer"
    />
  );
}
