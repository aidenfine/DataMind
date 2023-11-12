'use client'

import { getAllUserTotalCount } from "@/lib/getStats"

export const TotalUserGenerations = async () => {
    const total = getAllUserTotalCount();

    return (
        <h1 className="space-y-5 text-xl font-bold sm:text-xl md:text-xl lg:text-2xl"><span className="font-extrabold">{total}</span> total user generations!</h1>
    )
}