import { useEffect, useRef } from "react";

export default function MapSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-stone-100 text-stone-900"
      data-reveal
    >
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-24 md:grid-cols-2 md:items-center">
        <div className="relative overflow-hidden rounded-3xl border border-stone-300/60 bg-white p-3">
          <img
            src="/images/image6.png"
            alt="Memory map preview"
            className="h-72 w-full rounded-2xl object-cover"
          />
          <span className="map-pin map-pin-a" />
          <span className="map-pin map-pin-b" />
          <span className="map-pin map-pin-c" />
        </div>
        <div>
          <h2 className="text-3xl font-semibold sm:text-4xl">
            See Where Life Took You.
          </h2>
          <p className="mt-5 text-lg text-stone-600">
            Every memory is pinned to a place. Explore your life through
            locations and rediscover stories connected to places that matter.
          </p>
        </div>
      </div>
    </section>
  );
}
