"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePortfolioContent } from "@/lib/use-portfolio-content";

export default function Hero() {
  const { profile } = usePortfolioContent();
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 md:px-8 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${profile.heroImage})` }}
    >
      {/* overlay visibile*/}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* heading */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-extrabold 
          text-[#f4efe7] pt-20 md:pt-12"
        >
          {profile.heroGreeting} <span className="text-[#e6b35a]">& welcome.</span>
        </motion.h1>

        {/* subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-[#e5ddd3] 
          max-w-[95%] sm:max-w-xl md:max-w-2xl leading-relaxed"
        >
          {profile.heroIntro}
        </motion.p>

        {/* buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6"
        >
          <Link
            href="/projectsPage"
            className="px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-[#c45b3c] hover:bg-[#a94730] text-white text-base sm:text-lg font-medium transition"
          >
            View My Projects
          </Link>
          <Link
            href="/contacts"
            className="px-6 py-3 sm:px-8 sm:py-4 rounded-full border border-[#e6b35a] text-[#f6cf80]
             hover:bg-[#e6b35a] hover:text-[#1c2421] text-base sm:text-lg font-medium transition max-sm:mb-5"
          >
            Contact Me
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

