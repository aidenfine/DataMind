import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface HeadingProps {
    title: string;
    description: string;
    icon: LucideIcon;
    iconColor?: string;
    bgColor?: string;
}

export const Heading = ({
    title,
    description,
    icon : Icon,
    iconColor,
    bgColor
}: HeadingProps) => {
    return (
        <>
        <div className="flex items-center px-4 mb-8 lg:px-8 gap-x-3">
            </div>
             <div>
                <h2 className="ml-8 text-3xl font-bold ">
                    {title}
                </h2>
                <p className="pl-5 ml-3.5 text-sm text-muted-foreground">
                    {description}
                </p>
            </div>
        </>
    )
}