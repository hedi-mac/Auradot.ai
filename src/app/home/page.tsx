"use client";
import React from "react";
import Button from '@mui/material/Button';
import { Boxes } from "@/components/ui/background-boxes";
import "./style.css";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
export default function HomePage() {

  const router = useRouter();
  return (
    <motion.div 
      initial={{ opacity:0 }}
      animate={{ 
          opacity:1, 
          transition: { delay: 2, duration: 0.4, ease: "easeIn" }
      }} 
              className="py-6 overflow-hidden"
              >
 

      <Boxes className="hidden xl:flex "/>
       
      <div className="home_body">
        <h1 className='app_title' style={{fontFamily: 'courier new'}}>
            auradot<span className="text-accent">.</span>ai
        </h1>
        <Link href="/contact">
          <Button 
            onClick={() => {
              router.push('/contact');
            }}
            sx={{ fontSize: '20px', padding: '10px 100px' }}
            variant="outlined"
            > Contact Us
          </Button>
        </Link>
        
      </div>
 
    </motion.div>
  );
}
