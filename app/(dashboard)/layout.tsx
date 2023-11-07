import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar';
import { getApiLimitCount } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

const DashboardLayout = async({
    children
} : {
    children: React.ReactNode;
}) => {
    const apiLimitCount = await getApiLimitCount();
    const isPro = await checkSubscription();
    return(
        <div className="relative h-full">
            <div className="hidden h-full bg-white md:flex md:w-60 md:flex-col md:fixed md:inset-y-0">
                <div>
                    <Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
                </div>
            </div>
            <main className="md:pl-60">
                <Navbar />
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout;