import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Features", id: "features" },
    { label: "How It Works", id: "how-it-works" },
  ];

  const scrollToSection = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-stone-900/95 text-white shadow-lg backdrop-blur-md"
          : "bg-transparent text-white"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          to="/"
          className="flex items-center gap-2 -ml-2"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center">
            <span className="text-stone-900 font-bold text-xl">M</span>
          </div>
          <span className="hidden text-xl font-bold text-white sm:block">
            Memona
          </span>
        </Link>

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
          <Link
            to="/login"
            className="text-sm font-medium text-stone-300 transition hover:text-white"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-stone-900 transition hover:bg-stone-100"
          >
            Get Started
          </Link>
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
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium"
            >
              Log in
            </Link>
            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="mt-1 inline-flex w-fit rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-stone-900"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
