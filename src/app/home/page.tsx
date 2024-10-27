"use client";
import React from "react";
import Button from '@mui/material/Button';
import { Boxes } from "@/components/ui/background-boxes";
import "./style.css";
import NavbarList from "@/components/navbar";
import { useRouter } from 'next/navigation';
import TransitionLink from '@/lib/TransitionLink'

export default function HomePage() {

  const router = useRouter();
  return (
    <div  style={{
      position: "relative",
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
    }}>
      <Boxes />
      <div style={{ marginTop: '0px'}}>
        <NavbarList />
      </div>
      <div className="home_body">
        <h1 className='app_title' style={{fontFamily: 'courier new'}}>
            auradot.ai
        </h1>
        <TransitionLink href="/contact">
          <Button 
            onClick={() => {
              router.push('/contact');
            }}
            sx={{ fontSize: '20px', padding: '10px 100px' }}
            variant="outlined"
            > Contact Us
          </Button>
        </TransitionLink>
        
      </div>
    </div>
  );
}
