'use client'

import { Card } from "@/components/ui/card"
import { tools } from "@/helpers/tools"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

const DashboardPage = () => {
    const router = useRouter();
    return (
        <div>
            <div className="mb-8 space-y-4">
                <h2 className="text-2xl font-bold text-center md:text-4xl">
                    The all in one AI tool
                </h2>
                <p className="text-sm font-light text-center text-muted-foreground mdl:text-lg">
                Empowering Tomorrow with AI Today
                </p>
            </div>
            <div className="px-4 space-y-4 md:px-20 lg:px-32">
                {tools.map((tool) => (
                    <Card
                    onClick={() => router.push(tool.href)}
                     key={tool.href}
                    className="flex items-center justify-between p-4 transition cursor-pointer border-black/5 hover:shadow-md">
                        <div className="flex items-center gap-x-4">
                            <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                            <tool.icon className={cn("w-8 h-8", tool.color)} />
                            </div>
                            <div className="font-semibold">
                                {tool.label}
                            </div>
                            <ArrowRight className="w-5 h-5" />
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default DashboardPage
