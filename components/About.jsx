"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section
      id="about"
      className="relative flex flex-col md:flex-row items-center justify-between px-6 sm:px-12 lg:px-20 py-20 text-white"
    >
      {/* image */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 flex justify-center md:justify-start mb-10 md:mb-0"
      >
        <div
          className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[22rem] lg:h-[30rem] xl:w-[40rem] xl:h-[25rem] 
          rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/30 border-4 border-cyan-500/30"
        >
          <Image
            src="/me.jpg"
            alt="Ibrahim Muhammad Sani"
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
        <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
          About Me
        </h2>
        <p className="mt-6 text-gray-800 text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
          Hey there! 👋 I'm{" "}
          <span className="text-cyan-400 font-semibold">
            Ibrahim Muhammad Sani
          </span>
          , a passionate{" "}
          <span className="text-indigo-400">Web Developer</span> and{" "}
          <span className="text-teal-300">Mobile App Developer</span>.
          <br />
          I'm currently pursuing a{" "}
          <span className="text-cyan-400 font-semibold">
            Bachelor's degree in Computer Engineering
          </span>{" "}
          at{" "}
          <span className="text-indigo-400 font-semibold">
            Ahmadu Bello University, Zaria
          </span>
          .
          <br />
          Alongside my studies, I'm an{" "}
          <span className="text-cyan-400 font-semibold">Intern</span> at{" "}
          <span className="text-indigo-400 font-semibold">
            Early Code Institute
          </span>
          , where I'm sharpening my skills in{" "}
          <span className="text-teal-300">React</span>,{" "}
          <span className="text-cyan-400">Next.js</span>, and building{" "}
          <span className="text-indigo-400">Android</span> &{" "}
          <span className="text-teal-300">iOS</span> apps.
          <br />
          My goal is to craft{" "}
          <span className="text-cyan-400">stunning</span>,{" "}
          <span className="text-indigo-400">high-performance</span>, and{" "}
          <span className="text-teal-300">interactive</span> digital experiences
          while continuously growing as a developer.
        </p>

        {/* skills */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4 text-cyan-400">
            My Core Skills
          </h3>
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            {[
              "React.js",
              "Next.js",
              "Tailwind CSS",
              "JavaScript",
              "React Native",
              "Firebase",
              "Android Dev",
              "iOS Dev",
            ].map((skill, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="px-4 py-2 bg-gray-800 border border-cyan-500/40 rounded-full text-sm sm:text-base 
                hover:bg-cyan-500 hover:text-black cursor-pointer transition"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>

        {/* cta Button */}
        <div className="mt-10">
          <Link
            href="/projects"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 
            hover:opacity-90 text-white font-medium transition"
          >
            View My Projects
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
