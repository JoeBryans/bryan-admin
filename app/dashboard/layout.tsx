import SideBar from '@/components/custom/dashboard/SideBar'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div
            className='w-full min-h-screen flex gap-2 '
        >
            {/* sidebar */}
            <div className='w-40 relative bg-red-500 '>
                <SideBar />
            </div>

            <main className='w-full flex-1 p-5 '>
                {children}
            </main>
        </div>
    )
}

export default layout