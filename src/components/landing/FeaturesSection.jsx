import { useEffect, useRef } from "react";

const useCases = [
  {
    title: "Travel Adventures",
    caption: "Some journeys change who we become.",
    image: "/images/image1.png",
  },
  {
    title: "Family Celebrations",
    caption: "Laughter echoes long after the day is gone.",
    image: "/images/image2.png",
  },
  {
    title: "Personal Milestones",
    caption: "Growth is made of moments you almost forget.",
    image: "/images/image3.png",
  },
  {
    title: "Everyday Joy",
    caption: "Quiet days often become the memories we miss most.",
    image: "/images/image4.png",
  },
  {
    title: "Precious Moments",
    caption: "The small things are often the most meaningful.",
    image: "/images/image5.png",
  },
  {
    title: "Life's Treasures",
    caption: "Every moment tells a story worth keeping.",
    image: "/images/image6.png",
  },
];

export default function FeaturesSection() {
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
      id="features"
      ref={sectionRef}
      className="bg-[#f5efe7] text-stone-900"
      data-reveal
    >
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Moments Worth Remembering.
          </h2>
          <p className="mt-3 text-lg text-stone-600">
            Capture every precious moment in stunning detail
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {useCases.map((item, index) => (
            <article
              key={item.title}
              className="group relative overflow-hidden rounded-2xl shadow-lg transition duration-300 hover:shadow-2xl"
              style={{
                animation: `slideUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-stone-200">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
              </div>

              {/* Text Content with Dynamic Gradient */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white bg-gradient-to-t from-black/50 via-black/20 to-transparent transition-all duration-300 group-hover:from-black/80 group-hover:via-black/40">
                <h3 className="text-lg font-semibold transition duration-300 group-hover:opacity-0 opacity-100">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-white/90 opacity-0 transition duration-300 group-hover:opacity-100">
                  {item.caption}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style JSX>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
