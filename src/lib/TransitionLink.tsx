"use client"

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

interface TransitionLinkProps extends LinkProps {
    children: ReactNode;
    href: string;
}
const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
const TransitionLink = ({
    children, 
    href,
    ...props
}: TransitionLinkProps) => {
    const router = useRouter();
    
    const HandleTransition = async(
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        e.preventDefault();
        const body = document.querySelector("body")
        body?.classList.add("page_transition")
        await sleep(300)
        router.push(href);
        href == '/home'? await sleep(500) : await sleep(200);
        body?.classList.remove("page_transition");
    }
    return (
        <Link
            onClick={HandleTransition} 
            href={href}{...props}>
            {children}
        </Link>
    )
};

export default TransitionLink;