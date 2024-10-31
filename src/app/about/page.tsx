"use client";
import * as React from 'react';
import Button from '@mui/material/Button';
import { FiDownload } from "react-icons/fi";
import Social from "@/components/social"
import Photo from "@/components/photo"
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';

export default function Contact() {
  const router = useRouter();
  
  return (
    <section className="f-full z-20 pl-3 pr-3 " style={{ fontFamily: 'Roboto, sans-serif' }}>
    <div className="container mx-auto h-full pl-5 pr-5">
      <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24 pl-3 pr-3">
        {/* Presentation */}
        <div className="text-center xl:text-left order-2 xl:order-none">
          <span className="text-x inline-flex" >ABOUT US</span>
          <h1 className='h2' style={{fontFamily: 'courier new'}}>
              auradot<span className="text-accent">.</span>ai
          </h1>
          <h1 className="h1 mb-6">Our Mission<span className="text-accent">?</span> </h1>
          <p className="max-w-[500px] mb-9 text-white/80 font-roboto">We specialize in artificial intelligence (AI) solutions and advanced data architecture. We work on projects involving language models (LLM), retrieval-augmented generation (RAG), and custom AI solutions.</p>
          {/* Social */}
          <div className="flex flex-col xl:flex-row items-center gap-8 ">
          <Link href="/contact">
          <motion.div 
                initial={{ opacity:0 }}
                animate={{ 
                    opacity:1, 
                    transition: { delay: 0.9, duration: 0.4, ease: "easeIn" }
                }}>
          <Button 
            onClick={() => {
              router.push('/contact');
            }}
            sx={{ fontSize: '20px', padding: '10px 100px' }}
            variant="outlined"
            > Contact Us
          </Button>
          </motion.div>
        </Link>
            <div className="mb-8 xl:mb-0">
            <Social containerStyles="flex gap-6" iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"/>
            </div>
          </div>
          
        </div>
        <div className='order-1 xl:order-none mb-8 xl:mb-0 hover:cursor-pointer'>
          <Photo />
        </div>
      </div>
    </div> 
  </section>
 
  );
}
