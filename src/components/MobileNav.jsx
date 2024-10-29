"use client";
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
 
import { useState } from "react";
import { useRouter } from 'next/router';

const links = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "About",
        path: "/about",
    },
    {
        name: "contact",
        path: "/contact",
    }
];

const MobileNav = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const handleLinkClick = () => {
        setTimeout(() => {
            setIsOpen(false); 
        }, 100);
    };

    return ( 
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger 
                onClick={() => setIsOpen(true)} 
                className="flex justify-center items-center "
            >
                <CiMenuFries className='text-[32px] text-accent hover:text-white'/>
            </SheetTrigger>
            <SheetContent className="flex flex-col ">
                <div className='mt-32 mb-40 text-center text-2xl' style={{ fontFamily: 'Roboto, sans-serif' }}>
                    <Link href="/" onClick={handleLinkClick}>
                        <h1 className="text-4xl font-semibold group">
                            <img src="/logo.png" className="inline" style={{width: '64px', height: '64px'}} />  
                            <span className="title-logo group-hover:text-accent">Auradot</span> 
                            <span className="text-accent title-point group-hover:text-white"> . </span> 
                            <span className="title-logo group-hover:text-accent">AI</span>  
                        </h1>
                    </Link>
                </div>
                <nav className='flex flex-col justify-center items-center gap-8' style={{ fontFamily: 'Roboto, sans-serif' }}>
                    {links.map((link, index) => {
                        return (
                            <Link
                                href={link.path}
                                key={index} 
                                onClick={handleLinkClick}
                                className={`${ link.path === pathname && "text-xl capitalize hover:text-accent border-b-2 border-accent"} text-xl capitalize hover:text-accent transition-all`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>
            </SheetContent>
        </Sheet> 
    );
};
 
export default MobileNav;
