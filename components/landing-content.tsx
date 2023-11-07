"use client"

import { testimonials } from "@/helpers/testimonials"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"



export const LandingContent =() => {
    return (
        <div className="px-10 pb-20">
            <h2 className="mb-10 text-4xl font-extrabold text-center text-black">
                Testimonials
            </h2>
            <div className="grid gap-4 gird-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {testimonials.map((item) => (
                    <Card key={item.description} className="text-white bg-white border-none">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2">
                                <div>
                                    <p className="text-lg text-black">{item.name}</p>
                                    <p className="text-sm text-zinc-400">{item.title}</p>
                                </div>
                            </CardTitle>
                            <CardContent className="px-0 pt-4 text-black">
                                {item.description}
                            </CardContent>

                        </CardHeader>
                    </Card>
                ))}

            </div>
            
        </div>
    )
}