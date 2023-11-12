import { title } from "process"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { AxeIcon, LucideIcon } from "lucide-react"

interface StatCardProps {
    title: string,
    data: number,
    Icon: LucideIcon,
    subText: string,
}

export const StatCard = ({
    title = "",
    data = 0,
    Icon = AxeIcon,
    subText = '',
}: StatCardProps) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  {title}
                </CardTitle>
                <Icon className="w-4 h-4 text-muted-foreground"/>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#605BFF]">{data} <span className="text-sm font-normal text-black ">{subText}</span></div>
              </CardContent>
            </Card>
    )
}