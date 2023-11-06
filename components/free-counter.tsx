'use client'
import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";

interface FreeCounterProps{
    apiLimitCount: number;
}

export const FreeCounter = ({
    apiLimitCount = 0
}: FreeCounterProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

    }, [])
    if(!mounted){
        return null;
    }

    return(
        <div className="px-3">
            <Card className="border-0 bg-white/10">
                <CardContent className="py-6">
                    <div className="mb-4 space-y-2 text-sm text-center text-black">
                        <p>
                            {apiLimitCount} / {MAX_FREE_COUNTS} Free generations
                        </p>
                        <Progress 
                        className="h-3"
                        value={(apiLimitCount / MAX_FREE_COUNTS) * 100 }
                        />
                    </div>
                    <Button variant="upgrade" className="w-full">
                        Upgrade 
                        <Zap className="w-4 h-4 ml-2 fill-green" />
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}