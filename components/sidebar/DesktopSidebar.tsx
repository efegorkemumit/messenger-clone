'use client'

import useRoutes from '@/app/hook/action/useRoutes'
import { User } from '@prisma/client'
import React, { useState } from 'react'
import DesktopItem from './DesktopItem'
import Avatar from '../Avatar'
import SettingsModal from './SettingsModal'

interface DesktopSidebarProps{
    currentUser : User
}

const DesktopSidebar: React.FC<DesktopSidebarProps>=({currentUser})=> {

    const routes = useRoutes();
    const [isOpen,  setIsOpen] = useState(false);
  return (
    <>
    <SettingsModal currentUser={currentUser} 
    isOpen={isOpen} onClose={()=>setIsOpen(false)}
    ></SettingsModal>


    <div className='hidden
    lg:flex
    lg:flex-col
    lg:fixed
    lg:bg-white
    lg:border-r-2
    lg:pb-4
    lg:px-3
    lg:w-20
    lg:overflow-y-auto
    lg:left-0
    lg:inset-y-0
    justify-between'>

        <nav className='mt-5 flex flex-col justify-between'>    

            <ul role='list' className='flex flex-col justify-between'>
                {routes.map((item)=>(

                     <DesktopItem
                     key={item.label}
                     href={item.href}
                     label={item.label}
                     icon={item.icon}
                     active={item.active}
                     onClick={item.onClick}
                     
                     />


                     


                ))}



            </ul>
        
        
        </nav>



        <nav className='mt-5 flex flex-col items-center justify-between'>   
        
        <div onClick={()=>setIsOpen(true)}>
        <Avatar user={currentUser}></Avatar>
        </div>
         
         </nav>

        
        
    </div>

    </>
  )
} 

export default DesktopSidebar