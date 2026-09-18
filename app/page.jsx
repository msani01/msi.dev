"use client"
import React from 'react'
import Hero from "@/components/Hero";
import About from "@/components/About";
import Link from 'next/link';
import { ArrowUpRight } from "lucide-react";
import { usePortfolioContent } from "@/lib/use-portfolio-content";


const page = () => {
  const { projects } = usePortfolioContent();

  return (
        <section>
          {/* hero section */}
          <Hero />

          {/* about section */}
          <About />

          <section className="bg-[#f4efe7] px-6 py-24 text-[#1c2421] sm:px-12 lg:px-20">
            <div className="mx-auto max-w-7xl">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c45b3c]">Selected work</p>
                  <h2 className="mt-3 text-3xl font-bold sm:text-5xl">Ideas, made useful.</h2>
                </div>
                <Link href="/projectsPage" className="inline-flex items-center gap-2 text-[#c45b3c] hover:text-[#8f3f2b]">See all projects <ArrowUpRight size={18} /></Link>
              </div>
              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {projects.slice(0, 3).map((project) => (
                  <Link key={project.id} href="/projectsPage" className="group rounded-2xl border border-[#d9cec0] bg-white p-6 transition hover:-translate-y-1 hover:border-[#c45b3c]">
                    <div className="flex items-center justify-between gap-4"><h3 className="text-xl font-semibold">{project.title}</h3><ArrowUpRight className="text-[#a39a90] transition group-hover:text-[#c45b3c]" size={18} /></div>
                    <p className="mt-4 text-sm leading-7 text-[#5e6863]">{project.description}</p>
                    <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-[#71856d]">{project.category === "mobile" ? "Android & iOS" : "Web development"}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </section>
  )
}

export default page
