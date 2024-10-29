"use client";
import { motion } from "framer-motion";
import Image from "next/image";


const Photo = () => {
    return (
        <>
        <div className="w-full h-full relative">
            
            <motion.div 
                initial={{ opacity:0 }}
                animate={{ 
                    opacity:1, 
                    transition: { delay: 2.2, duration: 0.4, ease: "easeInOut" }
                }}>
                {/* Image */}
                <div className="w-[278px] h-[278px] xl:w-[428px] xl:h-[428px] mix-blend-lighten absolute right-0  top-[28px] xl:top-[50px]">
                    <Image src="/logo.png" priority quality={100} fill alt="Auradot.ai" className="object-contain"/>
                </div>

                {/* Circle */}
                <motion.svg 
                className="w-[300px] xl:w-[476px] h-[300px] xl:h-[476px] "
                fill="transparent"
                viewBox="0 0 506 506"
                xmlns="http://www.w3.org/2000/svg"
                >
                <motion.circle cx="253" cy="253" r="250" stroke="#62ccfc" strokeWidth="4" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    initial={{ strokeDasharray: "24 10 0 0" }}
                    animate={{
                        strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
                        rotate: [120, 360]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />
            </motion.svg>
            </motion.div>
            
            
        </div>
        
        </>
    );
}

export default Photo
