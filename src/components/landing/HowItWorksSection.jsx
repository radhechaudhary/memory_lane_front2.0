import { useEffect, useRef } from "react";
import { FiCamera, FiGrid, FiPlayCircle } from "react-icons/fi";

const howItWorks = [
  {
    step: "Capture",
    description:
      "Upload photos, videos, voice notes, and locations to preserve moments exactly as they felt.",
    icon: FiCamera,
  },
  {
    step: "Organize",
    description:
      "Tag memories, group them into albums, and build a structured timeline of your life.",
    icon: FiGrid,
  },
  {
    step: "Relive",
    description:
      "Use the Reminisce feature and AI-generated memory videos to experience your past in new ways.",
    icon: FiPlayCircle,
  },
];

export default function HowItWorksSection() {
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
      id="how-it-works"
      ref={sectionRef}
      className="bg-stone-50 text-stone-900"
      data-reveal
    >
      <div className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Your Story, Organized Beautifully.
        </h2>
        <p className="mt-4 max-w-3xl text-lg text-stone-600">
          MemoryLane transforms scattered moments into a living timeline you can
          revisit anytime.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {howItWorks.map((item) => (
            <article
              key={item.step}
              className="card-soft rounded-3xl bg-white p-7"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                <item.icon className="text-lg" />
              </div>
              <h3 className="text-2xl font-medium">{item.step}</h3>
              <p className="mt-3 text-stone-600">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
