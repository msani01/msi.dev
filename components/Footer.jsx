"use client";

import { Facebook, Github, Instagram, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <section className="bg-black/50 backdrop-blur-lg border-t border-gray-800 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 space-y-6 md:space-y-0">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r
         from-indigo-800 to-cyan-800">
          MSI.dev
        </Link>
        
        {/* Social Icons */}
        <div className="flex space-x-6">
          <Link
            href="https://web.facebook.com/profile.php?id=100077389882171"
            target="_blank"
            className="text-gray-300 hover:text-gray-950 transition-colors duration-300"
          >
            <Facebook size={22} />
          </Link>
          <Link
            href="https://github.com/msani01"
            target="_blank"
            className="text-gray-300 hover:text-gray-950 transition-colors duration-300"
          >
            <Github size={22} />
          </Link>
          <Link
            href="https://linkedin.com/in/muhammad-sani-ibrahim-10aa33349?"
            target="_blank"
            className="text-gray-300 hover:text-gray-950 transition-colors duration-300"
          >
            <Linkedin size={22} />
          </Link>
          <Link
            href="https://instagram.com/ndagi_jnr"
            target="_blank"
            className="text-gray-300 hover:text-gray-950 transition-colors duration-300"
          >
            <Instagram size={22} />
          </Link>
          <Link
            href="mailto:imuhammadsani08@gmail.com"
            className="text-gray-300 hover:text-gray-950 transition-colors duration-300"
          >
            <Mail size={22} />
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-gray-900 text-sm text-center">
          © {new Date().getFullYear()} Ibrahim M.Sani. All rights reserved.
        </p>
      </div>
    </section>
  );
}
