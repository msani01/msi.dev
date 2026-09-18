"use client";

import { useEffect, useState } from "react";
import { defaultContact, defaultProfile, defaultProjects, defaultSkills } from "@/lib/portfolio-data";
import { loadContent, loadProjects } from "@/lib/content-store";

export function usePortfolioContent() {
  const [content, setContent] = useState({
    profile: defaultProfile,
    projects: defaultProjects,
    skills: defaultSkills,
    contact: defaultContact,
  });

  useEffect(() => {
    let active = true;
    Promise.all([
      loadContent("profile", defaultProfile),
      loadProjects(defaultProjects),
      loadContent("skills", defaultSkills),
      loadContent("contact", defaultContact),
    ]).then(([profile, projects, skills, contact]) => {
      if (active) setContent({ profile, projects, skills, contact });
    });
    return () => { active = false; };
  }, []);

  return content;
}