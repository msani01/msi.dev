"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const projects = [
  {
    title: "TaskPal",
    description:
      "A task management web app built with React, Next.js, Firebase, and Tailwind CSS for seamless productivity tracking.",
    // image: "",
    tech: ["Next.js", "React", "Tailwind CSS", "Firebase"],
    link: "https://taskpal-sand.vercel.app/",
  },
  {
    title: "Unipeers",
    description:
      "This is an android & iOS App which is still in development",
    // image: "",
    tech: ["React Native", "Expo", "Node.js"],
    link: "#",
  },
  {
    title: "Panora",
    description:
      "A modern news dashboard built using GNews API, featuring filters, categories, and search functionality.",
    // image: "",
    tech: ["Next.js", "Tailwind-CSS", "GNews API"],
    link: "#",
  },
];

export default function ProjectsPage() {
  return (
      <section className="min-h-screen px-6 sm:px-12 lg:px-20 py-20 bg-gray-900">
        {/* heading */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold text-center text-cyan-400 "
        >
          My Projects
        </motion.h1>

        {/* subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-gray-300 text-center max-w-2xl mx-auto text-lg"
        >
          A showcase of my work, ranging from web applications to mobile apps.
        </motion.p>

        {/* project grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-cyan-500/20
              hover:border-cyan-400/40 transition duration-300"
            >
              {/* project image
              <div className="relative w-full h-48 sm:h-56 lg:h-64 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div> */}

              {/* project content */}
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-cyan-400 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4">{project.description}</p>

                {/* tech */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs bg-gray-700 text-cyan-300 rounded-full border
                      border-cyan-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* view project button */}
                <Link
                  href={project.link}
                  target="_blank"
                  className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500
                  to-cyan-500 hover:opacity-90 text-white font-medium transition"
                >
                  View Project
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
  );
}
