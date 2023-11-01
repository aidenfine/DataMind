import { CodeIcon, ImageIcon, MessageSquare, MusicIcon, VideoIcon } from "lucide-react";

export const tools = [
    {
        label: "Conversation",
        icon: MessageSquare,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
        href: "/conversation",    
    },
    {
        label: "Music Generation",
        icon: MusicIcon,
        color: "text-pink-700",
        bgColor: "bg-pink-700/10",
        href: "/music",    
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
        href: "/video",    
    },
    {
        label: "Code Generation",
        icon: CodeIcon,
        color: "text-[#2E71E5]",
        bgColor: "bg-[#2E71E5]",
        href: "/code",    
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        color: "text-pink-700",
        bgColor: "bg-pink-700/10",
        href: "/conversation",    
    }
]