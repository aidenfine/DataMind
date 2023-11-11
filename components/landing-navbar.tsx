"use client"

import { useAuth } from "@clerk/nextjs"
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export const  LandingNavbar =()=>{
    const { isSignedIn } = useAuth();

    return(
        <nav className="flex items-center justify-between p-4 bg-transparent">
            <Link href="/" className="flex items-center">
                <div className="relative w-10 h-8 mr-4">
                    <Image 
                    fill
                    alt="logo"
                    src="/logo.png"
                    />
                </div>
                <h1 className={cn("text-2xl font-bold text-black")}>
                    DataMind
                </h1>
            </Link>
            <div className="flex items-center gap-x-2">
                <Link href={isSignedIn ? "/dashboard": "/sign-up"}>
                    <Button variant="main" className="rounded-full">
                        Get Started

                    </Button>
                </Link>

            </div>


        </nav>
    )
}