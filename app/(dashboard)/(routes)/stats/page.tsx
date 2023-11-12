import { StatCard } from "@/components/statCard";
import { getAllUserTotalCount, getCodeCount, getConversationStats, getImageCount, getTotalStats, getVideoCount } from "@/lib/getStats";
import { CodeIcon, ImageIcon, MessageSquare, Plus, VideoIcon } from "lucide-react";
const StatsPage = async () => {
    const consersationCount = await getConversationStats();
    const totalCount = await getTotalStats();
    const codeCount = await getCodeCount();
    const imageCount = await getImageCount();
    const videoCount = await getVideoCount();
    return(
        <div className="grid gap-4 p-10 md:grid-cols-2 lg:grid-cols-5">
            <StatCard title="Total count" data={totalCount || 0} Icon={Plus} subText="total generations" />
            <StatCard title="Conversation Count" data={consersationCount || 0} Icon={MessageSquare} subText="conversations started" />
            <StatCard title="Code Count" data={codeCount || 0} Icon={CodeIcon} subText="projects helped" />
            <StatCard title="Image Count" data={imageCount || 0} Icon={ImageIcon} subText="works of AI art created" />
            <StatCard title="Video Count" data={videoCount || 0} Icon={VideoIcon} subText="short films made"/> 
        </div>
    )
}

export default StatsPage;``