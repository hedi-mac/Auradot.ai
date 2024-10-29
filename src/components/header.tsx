"use client";
import "./style.css"
import Link from 'next/link';
import { Button } from "./ui/button";
import { FaAngleRight } from "react-icons/fa";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import { usePathname } from "next/navigation";
function Header() {
  const pathname = usePathname()
  return (
 
  <header className="py-8 xl:py-12 text-white relative z-10" style={{ fontFamily: 'Roboto, sans-serif' }}>
    <div className="container mx-auto flex justify-between items-center">
     <Link href="/">
     <h1 className="text-4xl font-semibold group">
      <img src="/logo.png" className="inline" style={{width: '64px', height: '64px'}} />  
      <span className="title-logo group-hover:text-accent">Auradot</span> 
      <span className="text-accent title-point group-hover:text-white"> . </span> 
      <span className="title-logo group-hover:text-accent">AI</span>  
    </h1>
 

     </Link>
     {/* desctop nav */}
     <div className="hidden xl:flex items-center gap-8">
       <Nav /> 
       <Link href="/contact">
        <Button className={`${'/contact' === pathname && "text-white"} rounded-full h-[34px] p-3 hover:text-white`}>
          <span className="pr-2 border-r border-[#1c1c22] pt-0">CONTACT US</span>
          <FaAngleRight aria-hidden="true" className="ml-2 pt-0"/>
        </Button>
       </Link>
     </div>
     {/* mobile nav */}
     <div className="xl:hidden">
      <MobileNav/> 
     </div>
    </div>
 </header>
  );
}
export default Header;

