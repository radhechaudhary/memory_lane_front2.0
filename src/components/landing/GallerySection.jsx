import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials = [
    {
      text: "This spellbinding app stitches second-long snippets from your life into a compelling personal movie",
      author: "The New York Times",
    },
    {
      text: "I didn't expect that recording memories would change the way I lived, but it did.",
      author: "Forbes",
    },
    {
      text: "My memories are literally a timeline of my entire existence, from beginning to now!",
      author: "Sarah M.",
    },
  ];

  const images = [
    {
      src: "/images/image1.png",
      alt: "Memory moment 1",
      span: "col-span-2 row-span-2",
    },
    {
      src: "/images/image2.png",
      alt: "Memory moment 2",
      span: "col-span-1 row-span-1",
    },
    {
      src: "/images/image3.png",
      alt: "Memory moment 3",
      span: "col-span-1 row-span-1",
    },
    {
      src: "/images/image4.png",
      alt: "Memory moment 4",
      span: "col-span-1 row-span-2",
    },
    {
      src: "/images/image5.png",
      alt: "Memory moment 5",
      span: "col-span-1 row-span-1",
    },
    {
      src: "/images/image6.png",
      alt: "Memory moment 6",
      span: "col-span-1 row-span-1",
    },
    {
      src: "/images/image7.png",
      alt: "Memory moment 7",
      span: "col-span-1 row-span-1",
    },
  ];

  return (
    <section ref={ref} className="bg-[#F8F6F2] py-32 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-24 text-center"
        >
          <h2 className="font-['Plus_Jakarta_Sans'] text-3xl font-bold text-stone-900 md:text-4xl mb-12">
            Featured In
          </h2>
          <div className="grid gap-8 md:grid-cols-3 mb-16">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-left"
              >
                <p className="text-base italic text-stone-700 mb-4">
                  "{testimonial.text}"
                </p>
                <p className="text-sm font-semibold text-stone-900">
                  — {testimonial.author}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Gallery Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-['Plus_Jakarta_Sans'] text-3xl font-bold text-stone-900 md:text-4xl">
            Every Chapter Of Your Story
          </h2>
          <p className="mt-6 text-base text-stone-600">
            Perfect for every season, milestone, or tiny daily win.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-3 gap-4 md:grid-rows-3 md:gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${image.span} group relative overflow-hidden rounded-2xl shadow-lg`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
