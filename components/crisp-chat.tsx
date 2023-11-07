"use client"

import { useEffect } from "react"
import { Crisp } from 'crisp-sdk-web'

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("dc5ae645-3d87-47e3-9fc7-c3b10258571b")
    }, [])

    return null;
}