'use client'
import Image from 'next/image'
import Link from 'next/link'
import { routes } from '@/helpers/paths'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
    const pathname = usePathname();
    return ( 
        <div className="flex flex-col h-full py-4 space-y-4 ">
            <div className="flex-1 px-3 py-2">
                <Link href="/dashboard" className='flex items-center pl-3 mb-14'>
                    <div className='relative w-10 h-10 mr-4'>
                        <Image
                        fill
                        alt='Logo'
                        src="/logo.png"
                        />
                    </div>
                    <h1 className='text-2xl font-bold text-[#030229]'>NAME</h1>
                </Link>
                <div className='space-y-2.5'>
                    {routes.map((route) => (
                        <Link
                        href={route.href}
                        key={route.href}
                        className={cn('flex text-[#9A9AA9] justify-start w-full p-3 text-sm font-medium transition rounded-lg cursor-pointer group hover:text-[#7F7BFF] hover:bg-[#F3F3FF]', pathname === route.href ? "text-[#7F7BFF] bg-[#F3F3FF]" : "text-[#9A9AA9]")}
                        >
                            <div className='flex items-center flex-1'>
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)}></route.icon>
                                {route.label}
                            </div>

                        </Link>
                    ))}

                </div>
            </div>
        </div>

    )
}

export default Sidebar