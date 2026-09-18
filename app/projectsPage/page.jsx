"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { defaultProjects } from "@/lib/portfolio-data";
import { loadProjects } from "@/lib/content-store";

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [projects, setProjects] = useState(defaultProjects);

  useEffect(() => {
    loadProjects(defaultProjects).then(setProjects);
  }, []);

  const filteredProjects = projects.filter(
    (project) => activeFilter === "all" || project.category === activeFilter
  );

  return (
    <section className="min-h-screen px-6 sm:px-12 lg:px-20 py-28 bg-[#f4efe7] text-[#1c2421]">
      {/* heading */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-6xl font-extrabold text-center text-[#1c2421]"
      >
        My Projects
      </motion.h1>

      {/* subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-4 text-[#68716b] text-center max-w-2xl mx-auto text-lg"
      >
        Selected work across web products, cross-platform mobile apps, and the ideas in between.
      </motion.p>

      <div className="mt-10 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Project categories">
        {[{ label: "All work", value: "all" }, { label: "Web development", value: "web" }, { label: "Android & iOS", value: "mobile" }].map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => setActiveFilter(filter.value)}
            className={`rounded-full px-4 py-2 text-sm transition ${activeFilter === filter.value ? "bg-[#c45b3c] text-white" : "border border-[#cfc4b7] text-[#68716b] hover:border-[#c45b3c] hover:text-[#a94730]"}`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* project grid */}
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, index) => (
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
            className="bg-white rounded-2xl shadow-[0_12px_35px_rgba(48,39,29,0.08)] overflow-hidden border border-[#ded4c8]
            hover:border-[#c45b3c]/70 transition-all duration-300 flex flex-col justify-between min-h-[360px]"
          >
            {/* content */}
            <div className="p-6 flex flex-col flex-grow">
              {project.image && (
                <div className="relative mb-5 h-36 overflow-hidden rounded-xl">
                  <Image src={project.image} alt={project.title} fill className="object-cover" />
                </div>
              )}
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-2xl font-semibold text-[#1c2421]">{project.title}</h3>
                <span className="text-xs uppercase tracking-wider text-[#71856d]">{project.category === "mobile" ? "Mobile" : "Web"}</span>
              </div>

              {/* description */}
              <div className="overflow-y-auto max-h-[150px] custom-scrollbar mb-2">
                <p className="text-[#68716b] text-sm leading-7">{project.description}</p>
              </div>

              {/* tech stack */}
              <div className="flex flex-wrap gap-2 mb-4 mt-2">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                      className="px-3 py-1 text-xs bg-[#edf1e9] text-[#526550] rounded-full border border-[#cbd8c7]"

                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* view project button */}
              <div className="mt-auto">
                <div className="grid gap-2 sm:grid-cols-2">
                  <Link href={project.link} target="_blank" className="block w-full text-center px-4 py-3 rounded-xl bg-[#c45b3c] hover:bg-[#a94730] text-white font-semibold transition">View Project</Link>
                  {project.github && <Link href={project.github} target="_blank" className="block w-full text-center px-4 py-3 rounded-xl border border-[#cfc4b7] hover:border-[#c45b3c] text-[#68716b] hover:text-[#a94730] font-semibold transition">GitHub</Link>}
                </div>
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
