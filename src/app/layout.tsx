import type { Metadata } from "next";
import "./globals.css";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";
import Header from '@/components/header';

export const metadata: Metadata = {
  title: "Auradot.ia",
  description: "Auradot.ia website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="logo-sm.png" type="image/png"/> 
 
 
      </head>
      <body className="xl:overflow-hidden">  
      <Header/>
      <StairTransition/>
      <PageTransition>
        {children}  
      </PageTransition>
          
      </body>
    </html>
  );
}
