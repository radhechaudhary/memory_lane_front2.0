import { useEffect, useRef } from "react";
import { FiLock, FiCloud, FiUsers, FiFolder } from "react-icons/fi";

const trustItems = [
  { text: "Private by default", icon: FiLock },
  { text: "Secure cloud storage", icon: FiCloud },
  { text: "Custom sharing settings", icon: FiUsers },
  { text: "Collaborative albums with permissions", icon: FiFolder },
];

export default function TrustSection() {
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
      <div className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Your Memories. Your Control.
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {trustItems.map((item) => (
            <article
              key={item.text}
              className="card-soft rounded-2xl bg-white p-6"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  <item.icon />
                </div>
                <p className="text-lg text-stone-700">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
