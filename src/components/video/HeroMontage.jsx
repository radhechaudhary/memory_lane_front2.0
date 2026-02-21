import { useEffect, useRef, useState } from "react";

export default function HeroMontage({ images = [], mainVideo = "", duration = 15, preset = "default" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (images.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, (duration * 1000) / images.length);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [images.length, duration]);

  if (!images.length) {
    return (
      <div className="h-full w-full bg-stone-800 flex items-center justify-center">
        <span className="text-stone-400">Loading...</span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="hero-media-container h-full w-full overflow-hidden"
    >
      {images.map((src, index) => (
        <div
          key={index}
          className={`hero-media ${index === activeIndex ? "is-active" : ""}`}
          style={{ zIndex: index === activeIndex ? 1 : 0 }}
        >
          <img
            src={src}
            alt={`Memory ${index + 1}`}
            className="hero-media-image h-full w-full object-cover"
          />
        </div>
      ))}
      
      {mainVideo && (
        <div className="hero-media" style={{ zIndex: 0 }}>
          <video
            src={mainVideo}
            className="hero-media-video h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      )}
    </div>
  );
}

