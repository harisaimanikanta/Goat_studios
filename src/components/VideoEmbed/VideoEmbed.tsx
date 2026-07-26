import React, { useState } from "react";
import { X } from "lucide-react";
import "./VideoEmbed.css";

interface VideoEmbedProps {
  videoUrl: string;
  title: string;
  onClose: (e: React.MouseEvent) => void;
  closeButtonClass?: string;
}

export default function VideoEmbed({ videoUrl, title, onClose, closeButtonClass }: VideoEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="absolute inset-0 z-30 bg-black">
      {/* Loading Animation (behind iframe, visible until loaded) */}
      {!isLoaded && (
        <div className="video-loader-overlay">
          <div className="video-loader-content">
            {/* Animated ring spinner */}
            <div className="video-loader-ring">
              <div className="video-loader-ring-inner" />
            </div>
            {/* Pulsing text */}
            <span className="video-loader-text">LOADING</span>
            {/* Scanning bar */}
            <div className="video-loader-bar">
              <div className="video-loader-bar-fill" />
            </div>
          </div>
        </div>
      )}

      {/* YouTube iframe */}
      <iframe
        src={`${videoUrl}?autoplay=1&rel=0&modestbranding=1`}
        title={title}
        className={`w-full h-full transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ border: 'none' }}
        onLoad={() => setIsLoaded(true)}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className={closeButtonClass || "close-video-btn absolute top-3 right-3 z-40 w-9 h-9 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-500 backdrop-blur-md transition-all duration-300"}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
