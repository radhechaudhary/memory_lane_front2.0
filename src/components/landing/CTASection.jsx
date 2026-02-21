import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function CTASection() {
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
      className="bg-gradient-to-r from-amber-100 via-orange-100 to-rose-100 text-stone-900"
      data-reveal
    >
      <div className="mx-auto max-w-5xl px-6 py-24 text-center">
        <h2 className="text-4xl font-semibold">
          Start Preserving Your Story Today.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-700">
          Because memories deserve more than storage.
        </p>
        <Link
          to="/register"
          className="mt-8 inline-flex rounded-full bg-stone-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-stone-700"
        >
          Create Your Memona
        </Link>
      </div>
    </section>
  );
}
