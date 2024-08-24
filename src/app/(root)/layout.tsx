import { SidebarDemo } from '@/components/Sidebar'

import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <main className='flex flex-1'>
        <SidebarDemo/>
        <div className='p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full'>
           <div className=''>
            {children}
            </div> 
        </div>
    </main>
  )
}

export default layout