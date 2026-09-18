"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePortfolioContent } from "@/lib/use-portfolio-content";
import { saveMessage } from "@/lib/content-store";

export default function ContactPage() {
    const { profile, contact } = usePortfolioContent();
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [status, setStatus] = useState("");
    const [sending, setSending] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setSending(true);
        setStatus("");
        try {
            await saveMessage(form);
            setForm({ name: "", email: "", subject: "", message: "" });
            setStatus("Your message has been sent to the admin inbox. Thank you.");
        } catch (error) {
            setStatus(error.message || "The message could not be sent. Please try email directly.");
        } finally {
            setSending(false);
        }
    }
  return (
    <section>
        <section className="min-h-screen px-6 sm:px-12 lg:px-20 py-20 bg-[#f4efe7] text-[#1c2421]">
            {/* Heading */}
            <motion.h1
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl font-extrabold text-center text-[#1c2421]"
            >
                {contact.heading}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-[#68716b] text-center max-w-2xl mx-auto text-lg"
            >
                {contact.intro}
            </motion.p>

            {/* Contact Info */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-12 flex flex-col items-center space-y-6"
            >
                <div className="text-center space-y-2">
                <p className="text-[#68716b] text-lg">
                    📧 <span className="font-medium">Email:</span>{" "}
                    <a
                    href="mailto:imuhammadsani08@gmail.com"
                    className="text-[#a94730] hover:underline"
                    >
                    {profile.email}
                    </a>
                </p>
                <p className="text-[#68716b] text-lg">
                    📱 <span className="font-medium">Phone:</span>{" "}
                    <a
                    href={`tel:${profile.phone}`}
                    className="text-[#a94730] hover:underline"
                    >
                    {profile.phone}
                    </a>
                </p>
                <p className="text-[#68716b] text-lg">
                    📍 <span className="font-medium">Location:</span> Abuja, Nigeria.
                </p>
                {/* upwork link */}
                <p className="text-[#68716b] text-lg mt-4">
                💼 <span className="font-medium">You can also reach me on Upwork:</span>{" "}
                    <a
                    href={contact.upwork}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#a94730] hover:underline"
                >
                    View My Upwork Profile
                </a>
            </p>

                </div>

                {/* Social Media */}
                <div className="grid grid-cols-3 space-x-6 gap-4 items-center mt-3">
                <a
                    href={contact.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#68716b] hover:text-[#c45b3c] text-3xl transition"
                >
                    <FaGithub />
                </a>
                <a
                    href={contact.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#68716b] hover:text-[#c45b3c] text-3xl transition"
                >
                    <FaFacebook />
                </a>
                <a
                    href={contact.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#68716b] hover:text-[#c45b3c] text-3xl transition"
                >
                    <FaLinkedin />
                </a>
                <a
                    href={contact.socials.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#68716b] hover:text-[#c45b3c] text-3xl transition"
                >
                    <FaXTwitter />
                </a>
                <a
                    href={contact.socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#68716b] hover:text-[#c45b3c] text-3xl transition"
                >
                    <FaWhatsapp />
                </a>
                <a
                    href={contact.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#68716b] hover:text-[#c45b3c] text-3xl transition"
                >
                    <FaInstagram />
                </a>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 grid w-full max-w-2xl gap-4 text-left sm:grid-cols-2">
                    <input name="name" type="text" placeholder="Your name" aria-label="Your name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required className="rounded-xl border border-[#cfc4b7] bg-white px-4 py-3 text-[#1c2421] outline-none placeholder:text-[#9a9289] focus:border-[#c45b3c]" />
                    <input name="email" type="email" placeholder="Your email" aria-label="Your email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required className="rounded-xl border border-[#cfc4b7] bg-white px-4 py-3 text-[#1c2421] outline-none placeholder:text-[#9a9289] focus:border-[#c45b3c]" />
                    <input name="subject" type="text" placeholder="What can I help with?" aria-label="Subject" value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} required className="rounded-xl border border-[#cfc4b7] bg-white px-4 py-3 text-[#1c2421] outline-none placeholder:text-[#9a9289] focus:border-[#c45b3c] sm:col-span-2" />
                    <textarea name="message" placeholder="Tell me a little about your project" aria-label="Message" rows={5} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} required className="rounded-xl border border-[#cfc4b7] bg-white px-4 py-3 text-[#1c2421] outline-none placeholder:text-[#9a9289] focus:border-[#c45b3c] sm:col-span-2" />
                    <button type="submit" disabled={sending} className="rounded-xl bg-[#c45b3c] px-5 py-3 font-semibold text-white transition hover:bg-[#a94730] disabled:opacity-50 sm:col-span-2">{sending ? "Sending..." : "Send message"}</button>
                    {status && <p role="status" className="text-sm text-[#526550] sm:col-span-2">{status}</p>}
                </form>
            </motion.div>
        </section>
    </section>
  );
}
