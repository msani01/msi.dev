"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projectsPage" },
  { name: "Blog", href: "#" },
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
      className={`fixed top-0 left-0 w-full z-50 transition-colors ${
        scrolled
          ? "backdrop-blur-xl bg-white/60 shadow-lg"
          : "bg-white/50"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        {/* name */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-800
           to-cyan-800">
            MSI.dev
          </span>
        </Link>

        {/* desktop menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-900 hover:text-indigo-800 transition-colors duration-300"
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
          className="md:hidden bg-black/40 backdrop-blur-lg shadow-lg px-6 pb-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-3 text-gray-100 hover:text-gray-300 transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.section>
  );
}
