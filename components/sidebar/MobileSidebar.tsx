'use client'
import React from 'react'
import useRoutes from '@/app/hook/action/useRoutes'
import MobileItem from './MobileItem';

function MobileSidebar() {

    const routes = useRoutes();
  return (
    <div className='fixed 
    lg:hidden justify-between w-full bottom-0 z-30 flex
     bg-white border-t-2 '>
        
                {routes.map((item)=>(

                     <MobileItem
                     key={item.label}
                     href={item.href}
                     label={item.label}
                     icon={item.icon}
                     active={item.active}
                     onClick={item.onClick}
                     
                     />


                     


                ))}



        
        
        </div>
  )
}

export default MobileSidebar