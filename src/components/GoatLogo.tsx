import React from "react";

interface GoatLogoProps {
  className?: string;
  size?: number;
}

export default function GoatLogo({ className = "w-6 h-6", size = 24 }: GoatLogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="goatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f0ff" />
          <stop offset="50%" stopColor="#7000ff" />
          <stop offset="100%" stopColor="#ffe600" />
        </linearGradient>
        <linearGradient id="goatGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ffe600" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Outer Horn Arch */}
      <path
        d="M 38 32 C 40 20, 52 8, 68 8 C 84 8, 92 22, 90 38 C 88 52, 78 65, 68 62 C 78 56, 84 46, 84 34 C 84 22, 76 14, 64 14 C 52 14, 42 22, 38 32 Z"
        fill="url(#goatGrad)"
      />

      {/* Inner Horn Accent Lines */}
      <path
        d="M 44 26 C 50 18, 60 13, 68 13 C 78 13, 85 22, 84 32 C 81 24, 74 18, 66 18 C 58 18, 48 22, 44 26 Z"
        fill="#ffffff"
        opacity="0.85"
      />

      {/* Main Goat Head & Neck Profile */}
      <path
        d="M 38 32 
           C 34 33, 28 38, 20 48 
           C 14 55, 11 58, 12 60 
           C 13 62, 16 62, 18 60 
           C 20 58, 22 56, 26 58 
           C 28 59, 26 64, 24 67 
           C 28 66, 32 63, 34 58 
           C 36 65, 38 75, 42 92 
           C 46 82, 52 70, 62 58 
           C 54 62, 48 58, 46 50 
           C 48 44, 46 38, 40 35 
           Z"
        fill="url(#goatGrad)"
      />

      {/* Ear Contour */}
      <path
        d="M 40 37 C 44 39, 46 44, 42 48 C 39 45, 38 41, 40 37 Z"
        fill="#030308"
      />

      {/* Eye Cutout */}
      <ellipse
        cx="28"
        cy="45"
        rx="2.5"
        ry="1.8"
        transform="rotate(-15 28 45)"
        fill="#ffffff"
      />

      {/* Beard & Mane Sharp Cut Details */}
      <path
        d="M 32 50 Q 28 54 26 58 Q 30 57 32 54 Z"
        fill="#ffffff"
        opacity="0.9"
      />
      <path
        d="M 38 64 Q 34 72 32 80 Q 36 76 38 70 Z"
        fill="#ffffff"
        opacity="0.7"
      />
    </svg>
  );
}
