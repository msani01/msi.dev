"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <section>
        <section className="min-h-screen px-6 sm:px-12 lg:px-20 py-20 bg-gray-900 text-white">
            {/* Heading */}
            <motion.h1
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl font-extrabold text-center bg-gradient-to-r from-indigo-400
                 via-cyan-400 to-teal-300 bg-clip-text text-transparent"
            >
                Get in Touch
            </motion.h1>

            {/* Subtitle */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-gray-300 text-center max-w-2xl mx-auto text-lg"
            >
                I’d love to connect with you! You can reach out via email, phone, or any of my social platforms.
            </motion.p>

            {/* Contact Info */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-12 flex flex-col items-center space-y-6"
            >
                <div className="text-center space-y-2">
                <p className="text-gray-300 text-lg">
                    📧 <span className="font-medium">Email:</span>{" "}
                    <a
                    href="mailto:muhammad.sani@example.com"
                    className="text-cyan-400 hover:underline"
                    >
                    imuhammadsani08@gmail.com
                    </a>
                </p>
                <p className="text-gray-300 text-lg">
                    📱 <span className="font-medium">Phone:</span>{" "}
                    <a
                    href="tel:+2348012345678"
                    className="text-cyan-400 hover:underline"
                    >
                    +2349025721503
                    </a>
                </p>
                <p className="text-gray-300 text-lg">
                    📍 <span className="font-medium">Location:</span> Abuja, Nigeria.
                </p>
                {/* upwork link */}
                <p className="text-gray-300 text-lg mt-4">
                💼 <span className="font-medium">You can also reach me on Upwork:</span>{" "}
                <a
                    href="https://www.upwork.com/freelancers/~01ad2742910a32eb39?mp_source=share"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline"
                >
                    View My Upwork Profile
                </a>
            </p>

                </div>

                {/* Social Media */}
                <div className="grid grid-cols-3 space-x-6 gap-4 items-center mt-3">
                <a
                    href="https://github.com/msani01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-cyan-400 text-3xl transition"
                >
                    <FaGithub />
                </a>
                <a
                    href="https://www.facebook.com/share/1B5A3zs2yR/1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-cyan-400 text-3xl transition"
                >
                    <FaFacebook />
                </a>
                <a
                    href="https://linkedin.com/in/muhammad-sani-ibrahim-10aa33349?"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-cyan-400 text-3xl transition"
                >
                    <FaLinkedin />
                </a>
                <a
                    href="https://x.com/ndagi_jnr?t=9smUgeUGoP46WWQhZvMSHg&s=09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-cyan-400 text-3xl transition"
                >
                    <FaXTwitter />
                </a>
                <a
                    href="https://wa.me/qr/5RWO6NFUQPXYP1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-cyan-400 text-3xl transition"
                >
                    <FaWhatsapp />
                </a>
                <a
                    href="https://www.instagram.com/ndagi_jnr?igsh=MXJqYnBxODd4Z2Nhcg=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-cyan-400 text-3xl transition"
                >
                    <FaInstagram />
                </a>
                </div>
            </motion.div>
        </section>
    </section>
  );
}
