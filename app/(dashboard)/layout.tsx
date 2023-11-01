import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar';

const DashboardLayout = ({
    children
} : {
    children: React.ReactNode;
}) => {
    return(
        <div className="relative h-full">
            <div className="bg-white hidden h-full md:flex md:w-60 md:flex-col md:fixed md:inset-y-0 z-[80]">
                <div>
                    <Sidebar />
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