"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FiCamera, FiCloud, FiFolder, FiGrid, FiLock, FiPlayCircle, FiUsers } from "react-icons/fi";
import HeroMontage from "../components/video/HeroMontage";
import Footer from "../components/layout/Footer";

const howItWorks = [
  {
    step: "Capture",
    description:
      "Upload photos, videos, voice notes, and locations to preserve moments exactly as they felt.",
    icon: FiCamera
  },
  {
    step: "Organize",
    description:
      "Tag memories, group them into albums, and build a structured timeline of your life.",
    icon: FiGrid
  },
  {
    step: "Relive",
    description:
      "Use the Reminisce feature and AI-generated memory videos to experience your past in new ways.",
    icon: FiPlayCircle
  }
];

const useCases = [
  {
    title: "Travel Adventures",
    caption: "Some journeys change who we become.",
    image: "/images/image1.png"
  },
  {
    title: "Family Celebrations",
    caption: "Laughter echoes long after the day is gone.",
    image: "/images/image2.png"
  },
  {
    title: "Personal Milestones",
    caption: "Growth is made of moments you almost forget.",
    image: "/images/image3.png"
  },
  {
    title: "Everyday Joy",
    caption: "Quiet days often become the memories we miss most.",
    image: "/images/image4.png"
  }
];

const trustItems = [
  { text: "Private by default", icon: FiLock },
  { text: "Secure cloud storage", icon: FiCloud },
  { text: "Custom sharing settings", icon: FiUsers },
  { text: "Collaborative albums with permissions", icon: FiFolder }
];

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = useMemo(
    () => [
      { label: "Features", id: "features" },
      { label: "How It Works", id: "how-it-works" }
    ],
    []
  );

  useEffect(() => {
    const sections = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="bg-stone-950 text-stone-100">
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-stone-900/95 text-white shadow-lg backdrop-blur-md" : "bg-transparent text-white"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a
            href="#top"
            className="text-lg font-semibold tracking-wide"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Memona
          </a>

          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-medium text-stone-300 transition hover:text-white"
              >
                {link.label}
              </button>
            ))}
            <a href="/login" className="text-sm font-medium text-stone-300 transition hover:text-white">
              Log in
            </a>
            <a
              href="/signup"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-stone-900 transition hover:bg-stone-100"
            >
              Get Started
            </a>
          </div>

          <button
            type="button"
            className="md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="block h-0.5 w-6 bg-current" />
            <span className="mt-1.5 block h-0.5 w-6 bg-current" />
            <span className="mt-1.5 block h-0.5 w-6 bg-current" />
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-stone-800 bg-stone-900 p-5 text-white md:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollToSection(link.id)}
                  className="text-left text-sm font-medium"
                >
                  {link.label}
                </button>
              ))}
              <a href="/login" className="text-sm font-medium">
                Log in
              </a>
              <a
                href="/signup"
                className="mt-1 inline-flex w-fit rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-stone-900"
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </header>

      <section id="top" className="relative isolate min-h-screen overflow-hidden">
        {/* 1se.co style cinematic hero montage - 7 images + 1 video */}
        <div className="absolute inset-0">
          <HeroMontage
            images={[
              "/images/image1.png",
              "/images/image2.png",
              "/images/image3.png",
              "/images/image5.png",
              "/images/image6.png",
              "/images/image7.png",
              "/images/image4.png"
            ]}
            mainVideo="/video/hero.mp4"
            duration={15}
            preset="reflective"
          />
        </div>
        
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
              Your Life, Beautifully Remembered.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-stone-200 sm:text-lg">
              Capture moments, relive emotions, and build a living timeline of your life's most meaningful memories.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="/signup"
                className="rounded-full bg-amber-300 px-8 py-3.5 text-sm font-semibold text-stone-900 transition hover:bg-amber-200 hover:shadow-lg hover:shadow-amber-200/20"
              >
                Start Your Timeline
              </a>
              <button
                type="button"
                onClick={() => scrollToSection("how-it-works")}
                className="rounded-full border border-white/40 bg-black/30 px-8 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-black/50 hover:border-white/60"
              >
                Watch How It Works
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-stone-50 text-stone-900" data-reveal>
        <div className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="text-3xl font-semibold sm:text-4xl">Your Story, Organized Beautifully.</h2>
          <p className="mt-4 max-w-3xl text-lg text-stone-600">
            MemoryLane transforms scattered moments into a living timeline you can revisit anytime.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {howItWorks.map((item, index) => (
              <article key={item.step} className="card-soft rounded-3xl bg-white p-7">
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

      <section id="features" className="bg-[#f5efe7] text-stone-900" data-reveal>
        <div className="mx-auto max-w-7xl px-6 py-24">
          <h2 className="text-3xl font-semibold sm:text-4xl">Moments Worth Remembering.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {useCases.map((item) => (
              <article key={item.title} className="group relative overflow-hidden rounded-3xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-72 w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-0 p-6 text-white">
                  <h3 className="text-2xl font-medium">{item.title}</h3>
                  <p className="mt-2 text-sm text-white/90">{item.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-100 text-stone-900" data-reveal>
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-24 md:grid-cols-2 md:items-center">
          <div className="relative overflow-hidden rounded-3xl border border-stone-300/60 bg-white p-3">
            <img src="/images/image6.png" alt="Memory map preview" className="h-72 w-full rounded-2xl object-cover" />
            <span className="map-pin map-pin-a" />
            <span className="map-pin map-pin-b" />
            <span className="map-pin map-pin-c" />
          </div>
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">See Where Life Took You.</h2>
            <p className="mt-5 text-lg text-stone-600">
              Every memory is pinned to a place. Explore your life through locations and rediscover
              stories connected to places that matter.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-stone-950 text-stone-100" data-reveal>
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-24 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-semibold text-amber-200 sm:text-4xl">
              Turn Memories Into Living Stories.
            </h2>
            <p className="mt-5 text-lg text-stone-300">
              Instantly transform your photos and notes into cinematic memory videos powered by AI.
            </p>
          </div>
          <div className="group relative overflow-hidden rounded-3xl border border-stone-700/70 bg-black">
            <video
              className="h-72 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              src="/video/hero.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
            <button className="absolute inset-0 m-auto h-14 w-14 rounded-full border border-white/60 bg-black/50 text-white transition group-hover:scale-110" aria-label="Play preview">
              <FiPlayCircle className="mx-auto h-7 w-7" />
            </button>
          </div>
        </div>
      </section>

      <section className="bg-stone-100 text-stone-900" data-reveal>
        <div className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="text-3xl font-semibold sm:text-4xl">Your Memories. Your Control.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {trustItems.map((item) => (
              <article key={item.text} className="card-soft rounded-2xl bg-white p-6">
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

      <section className="bg-gradient-to-r from-amber-100 via-orange-100 to-rose-100 text-stone-900" data-reveal>
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <h2 className="text-4xl font-semibold">Start Preserving Your Story Today.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-700">
            Because memories deserve more than storage.
          </p>
          <a
            href="/signup"
            className="mt-8 inline-flex rounded-full bg-stone-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-stone-700"
          >
            Create Your Memona
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
