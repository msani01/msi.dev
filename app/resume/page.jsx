"use client";

import Link from "next/link";
import { ArrowLeft, Download, Mail, MapPin } from "lucide-react";
import { usePortfolioContent } from "@/lib/use-portfolio-content";

const experience = [
  {
    period: "2024 - Present",
    title: "Web & Mobile Developer Intern",
    company: "Early Code Institute",
    details: "Building responsive React and Next.js experiences while developing cross-platform mobile applications with React Native.",
  },
  {
    period: "Ongoing",
    title: "Computer Engineering Student",
    company: "Ahmadu Bello University, Zaria",
    details: "Studying the systems, software, and engineering principles behind reliable digital products.",
  },
];

export default function ResumePage() {
  const { profile, skills } = usePortfolioContent();
  const cvUrl = profile.cvUrl ? profile.cvUrl.replace("/upload/", "/upload/fl_attachment/") : "";
  return (
    <main className="min-h-screen bg-[#f4efe7] px-4 py-24 text-[#1c2421] sm:px-8 sm:py-28 lg:px-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center gap-2 text-[#68716b] transition hover:text-[#c45b3c]">
            {/* <ArrowLeft size={17} /> Back home */}
          </Link>
          {cvUrl ? (
            <a href={cvUrl} download target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#c45b3c] px-4 py-3 font-semibold text-white transition hover:bg-[#a94730]">
              <Download size={17} /> Download PDF CV
            </a>
          ) : (
            <Link href="/contacts" className="inline-flex items-center gap-2 rounded-xl bg-[#c45b3c] px-4 py-3 font-semibold text-white transition hover:bg-[#a94730]">
              <Mail size={17} /> Request PDF CV
            </Link>
          )}
        </div>

        <section className="border-b border-slate-700 pb-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#c45b3c]">Resume / CV</p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">{profile.name}</h1>
          <p className="mt-4 text-xl text-[#526550]">{profile.role}</p>
          <div className="mt-6 flex flex-wrap gap-5 text-sm text-[#68716b]">
            <span className="inline-flex items-center gap-2"><MapPin size={16} /> {profile.location}</span>
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 hover:text-[#c45b3c]"><Mail size={16} /> {profile.email}</a>
          </div>
        </section>

        <div className="grid gap-14 py-12 md:grid-cols-[1.4fr_0.8fr]">
          <section>
            <h2 className="mb-6 text-2xl font-semibold text-[#71856d]">Profile</h2>
            <p className="max-w-2xl text-lg leading-8 text-[#526550]">{profile.summary}</p>

            <h2 className="mb-6 mt-14 text-2xl font-semibold text-[#71856d]">Experience & education</h2>
            <div className="space-y-8">
              {experience.map((item) => (
                <article key={item.title} className="border-l border-cyan-300/50 pl-5">
                  <p className="text-sm uppercase tracking-wider text-[#68716b]">{item.period}</p>
                  <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-1 text-[#a94730]">{item.company}</p>
                  <p className="mt-3 leading-7 text-[#526550]">{item.details}</p>
                </article>
              ))}
            </div>
          </section>

          <aside>
            <h2 className="mb-6 text-2xl font-semibold text-[#71856d]">Toolkit</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => <span key={skill} className="rounded-full border border-[#cfc4b7] bg-white px-3 py-2 text-sm text-[#526550]">{skill}</span>)}
            </div>
            <div className="mt-12 border-t border-slate-700 pt-8">
              <h2 className="mb-4 text-2xl font-semibold text-[#71856d]">What I bring</h2>
              <ul className="space-y-4 text-[#526550]">
                <li>Clear communication and thoughtful collaboration.</li>
                <li>Responsive, accessible interface design.</li>
                <li>Curiosity for new tools and better systems.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
