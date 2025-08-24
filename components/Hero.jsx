"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen text-center px-4
       sm:px-6 md:px-8 bg-[url('/display.jpg')] bg-cover bg-center bg-no-repeat"
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
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold 
          bg-gradient-to-r from-indigo-400 via-cyan-400 to-teal-300 text-transparent bg-clip-text
          pt-20 md:pt-12"
        >
          Hi, I'm <span className="text-white">Ibrahim Muhammad Sani</span> 👋
        </motion.h1>

        {/* subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 
          max-w-[95%] sm:max-w-xl md:max-w-2xl leading-relaxed"
        >
          I'm a{" "}
          <span className="text-cyan-400 font-semibold">Computer Engineering student</span> at{" "}
          <span className="text-indigo-400 font-semibold">Ahmadu Bello University, Zaria</span>, 
          currently an{" "}
          <span className="text-cyan-400 font-semibold">Intern</span> at{" "}
          <span className="text-indigo-400 font-semibold">Early Code Institute</span>.
          I’m sharpening my skills in{" "}
          <span className="text-indigo-400 font-semibold">Web Development</span> using{" "}
          <span className="text-teal-300">React</span> &{" "}
          <span className="text-cyan-400">Next.js</span>, while also developing{" "}
          <span className="text-indigo-400">Android</span> &{" "}
          <span className="text-teal-300">iOS</span> apps to craft{" "}
          <span className="text-cyan-400">modern</span>,{" "}
          <span className="text-indigo-400">high-performance</span>, and{" "}
          <span className="text-teal-300">user-friendly</span> digital experiences.
        </motion.p>

        {/* buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6"
        >
          <Link
            href="/projects"
            className="px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 
            hover:opacity-90 text-white text-base sm:text-lg font-medium transition"
          >
            View My Projects
          </Link>
          <Link
            href="/contacts"
            className="px-6 py-3 sm:px-8 sm:py-4 rounded-full border border-cyan-400 text-cyan-400
             hover:bg-cyan-400 hover:text-black text-base sm:text-lg font-medium transition max-sm:mb-5"
          >
            Contact Me
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

