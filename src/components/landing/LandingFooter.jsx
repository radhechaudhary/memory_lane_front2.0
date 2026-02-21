import { FiHeart } from "react-icons/fi";

export default function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-16 md:grid-cols-4">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <span className="inline-block font-['Plus_Jakarta_Sans'] text-2xl font-bold text-amber-400">
              Memona
            </span>
            <p className="mt-6 text-base leading-relaxed text-white/70">
              Remember & Relive
              <br />
              Your Story In Minutes
            </p>
            <div className="mt-8 flex items-center gap-3 text-sm text-white/60">
              <span>Made with</span>
              <FiHeart className="h-5 w-5 text-red-400" />
              <span>for memory-makers everywhere</span>
            </div>
          </div>

          {/* Apps */}
          <div>
            <h3 className="mb-6 font-['Plus_Jakarta_Sans'] text-lg font-semibold">
              Apps
            </h3>
            <ul className="space-y-4 text-white/70">
              <li>
                <span className="text-base">Get Started</span>
              </li>
              <li>
                <span className="text-base">Sign In</span>
              </li>
              <li>
                <span className="text-base">Help Center</span>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-6 font-['Plus_Jakarta_Sans'] text-lg font-semibold">
              Company
            </h3>
            <ul className="space-y-4 text-white/70">
              <li>
                <span className="text-base">About Us</span>
              </li>
              <li>
                <span className="text-base">Blog</span>
              </li>
              <li>
                <span className="text-base">Press Kit</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-white/10 pt-10">
          <div className="flex flex-col items-center justify-between gap-6 text-white/60 md:flex-row">
            <p className="text-base">
              &copy; {currentYear} Memona. All rights reserved.
            </p>
            <div className="flex gap-8 text-base">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Cookie Policy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
