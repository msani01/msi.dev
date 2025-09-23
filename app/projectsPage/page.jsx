"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const projects = [
  {
    title: "TaskPal",
    description:
      "A task management web app built with React, Next.js, Firebase, and Tailwind CSS for seamless productivity tracking. It allows users to add, update, delete, and track their tasks efficiently. With Firebase authentication, users can have their own personalized dashboards. The app also includes due date reminders, task priorities, and a calendar view to keep everything organized and accessible in one place. TaskPal was designed with a clean UI and responsive design to work perfectly across all devices.",
    tech: ["Next.js", "React", "Tailwind CSS", "Firebase"],
    link: "https://taskpal-sand.vercel.app/",
  },
  {
    title: "Unipeers",
    description:
      "This is an Android & iOS App which is still in development. It aims to connect students from different universities, making networking easier. Users will be able to chat, share resources, and collaborate on projects. The app is being built with React Native and Expo for cross-platform compatibility, and Node.js is used on the backend. Once released, Unipeers will serve as a dedicated platform for peer-to-peer learning and engagement.",
    tech: ["React Native", "Expo", "Node.js"],
    link: "#",
  },
  {
    title: "Panora",
    description:
      "A modern news dashboard built using the GNews API, featuring filters, categories, and search functionality. Users can browse top headlines, filter news by category, and search for specific topics. The app provides a seamless experience with a responsive design, ensuring accessibility on all devices. Built with Next.js and Tailwind CSS, Panora focuses on performance and modern UI. The integration with GNews API ensures real-time news updates from trusted sources worldwide.",
    tech: ["Next.js", "Tailwind-CSS", "GNews API"],
    link: "#",
  },
];

export default function ProjectsPage() {
  const [expanded, setExpanded] = useState({});

  const toggleReadMore = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const getShortDescription = (text) => {
    const words = text.split(" ");
    if (words.length <= 150) return text;
    return words.slice(0, 150).join(" ") + "...";
  };

  return (
    <section className="min-h-screen px-6 sm:px-12 lg:px-20 py-20 bg-gray-900">
      {/* heading */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl font-extrabold text-center text-cyan-400"
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
            whileHover={{
              y: -10,
              scale: 1.03,
              boxShadow: "0 12px 25px rgba(34, 211, 238, 0.3)",
            }}
            className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-cyan-500/20
            hover:border-cyan-400/60 transition-all duration-300 flex flex-col justify-between h-[400px]"
          >
            {/* content */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-semibold text-cyan-400 mb-2">
                {project.title}
              </h3>

              {/* description */}
              <div className="overflow-y-auto max-h-[150px] custom-scrollbar mb-2">
                <p className="text-gray-300 text-sm">
                  {expanded[index]
                    ? project.description
                    : getShortDescription(project.description)}
                </p>
              </div>

              {/* Read More / Read Less */}
              {project.description.split(" ").length > 150 && (
                <button
                  onClick={() => toggleReadMore(index)}
                  className="text-cyan-400 text-sm font-semibold hover:underline mb-4 self-start"
                >
                  {expanded[index] ? "Read Less" : "Read More"}
                </button>
              )}

              {/* tech stack */}
              <div className="flex flex-wrap gap-2 mb-4 mt-2">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 text-xs bg-gray-700 text-cyan-300 rounded-full
                       border border-cyan-500/20`}

                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* view project button */}
              <div className="mt-auto">
                <Link
                  href={project.link}
                  target="_blank"
                  className="block w-full text-center px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500
                  to-cyan-500 hover:opacity-90 text-white font-medium transition"
                >
                  View Project
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* custom scrollbar styling */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(34, 211, 238, 0.6);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </section>
  );
}
