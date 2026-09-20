"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projectsPage" },
  { name: "Resume", href: "/resume" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contacts" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.section
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 border-b border-[#cfc4b7] transition-colors ${
          scrolled
          ? "backdrop-blur-xl bg-[#f4efe7]/50 shadow-sm"
          : "bg-[#f4efe7]/90"
      }`}
    >
      <div className="mx-auto flex min-w-0 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
        {/* name */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="truncate text-xl font-bold text-[#1c2421] sm:text-2xl">
            MS.Ibrahim
          </span>
        </Link>

        {/* desktop menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[#222724] hover:text-[#c45b3c] transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* mobile menu */}
        <button
          className="md:hidden text-gray-900"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden border-t border-[#cfc4b7] bg-[#f4efe7] shadow-lg px-6 pb-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-3 text-[#68716b] hover:text-[#c45b3c] transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.section>
  );
}
