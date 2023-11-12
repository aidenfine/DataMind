'use client'
import { useAuth } from "@clerk/nextjs"
import Link from "next/link";
import TypewriterComponent from 'typewriter-effect'
import { Button } from "./ui/button";
import { TotalUserGenerations } from "./total-user-generations";

export const LandingHero = () => {
    const { isSignedIn } = useAuth();
    return (
        <div className="space-y-5 font-bold text-center text-black py-36">
            <div className="space-y-5 text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl">
                <h1>
                    The best AI Tool 
                </h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    <TypewriterComponent 
                    options={{
                        strings: [
                            "Generate",
                            "Text.",
                            "Video's.",
                            "Photo's.",
                            "Code Snippets.",
                        ],
                        autoStart: true,
                        loop: true,
                    }}
                    />
                </div>
            </div>
            <div className="text-sm font-light md:text-xl text-zinc-400">
                Create content 10x faster using AI
            </div>
            <div>
                <Link href={isSignedIn ? "/dashboard" : "sign-up"}>
                    <Button variant="main" className="p-4 md:text-lg md:p-6">
                        Start Generating For Free
                    </Button>
                </Link>
            </div>
            <div className="text-xs font-normal text-zinc-400 md:text-sm">
                No credit card required.
            </div>

        </div>
    )
}