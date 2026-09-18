"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePortfolioContent } from "@/lib/use-portfolio-content";

export default function About() {
  const { profile, skills } = usePortfolioContent();
  return (
    <section
      id="about"
      className="relative flex flex-col gap-11 md:flex-row items-center justify-between px-6 sm:px-12
      lg:px-20 py-20 bg-[#1c2421] text-[#f4efe7]"
    >
      {/* image */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 flex justify-center md:justify-start mb-10 md:mb-0"
      >
        <div
          className="relative w-64 h-64 sm:w-[19rem] sm:h-[35rem] lg:w-[22rem] lg:h-[30rem] xl:w-[22rem] xl:h-[30rem] 
          rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/30 border-4 border-cyan-500/30"
        >
          <Image
            src={profile.profileImage || "/me.jpg"}
            alt={profile.name}
            fill
            priority
            className="object-cover hover:scale-110 transition-transform duration-500"
          />
        </div>
      </motion.div>

      {/* about content */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 text-center md:text-left"
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#e6b35a]">
          {profile.aboutTitle}
        </h2>
        <p className="mt-6 text-[#d8d1c8] text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
          {profile.aboutText}
        </p>

        {/* skills */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4 text-[#e6b35a]">
            My Core Skills
          </h3>
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            {skills.map((skill, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="px-4 py-2 bg-[#2c3832] border border-[#71856d]/60 rounded-full text-sm sm:text-base 
                hover:bg-[#71856d] hover:text-white cursor-pointer transition"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>

        {/* cta Button */}
        <div className="flex flex-1 gap-5 max-sm:flex-col max-sm:gap-1">
          <div className="mt-10  ">
          <Link
            href="/projectsPage"
            className="px-6 py-3 rounded-full bg-[#c45b3c] hover:bg-[#a94730] text-white font-medium transition"
          >
            View My Projects
          </Link>
          </div>
          <div className="mt-10">
            <Link
              href="/resume"
              className="px-6 py-3 rounded-full border border-[#e6b35a] text-[#f6cf80] hover:bg-[#e6b35a] hover:text-[#1c2421] font-medium transition"
            >
              View My CV
            </Link>
          </div>
          </div>
      </motion.div>
    </section>
  );
}
