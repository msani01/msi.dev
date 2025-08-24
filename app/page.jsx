"use client"
import React from 'react'
import Hero from "@/components/Hero";
import About from "@/components/About";
import Footer from '@/components/Footer';
import Link from 'next/link';
import Navbar from '@/components/Navbar';


const page = () => {

  return (
        <section>
          {/* hero section */}
          <Hero />

          {/* about section */}
          <About />

          {/* skills section */}
          <hr className='border-1'/>
        </section>
  )
}

export default page
