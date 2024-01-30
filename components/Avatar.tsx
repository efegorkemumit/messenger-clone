'use client'

import useActiveList from '@/app/hook/action/useActiveList'
import { User } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

interface AvatarProps{
    user?: User
}

const  Avatar: React.FC<AvatarProps>=({user})=> {

    const  {members} = useActiveList();
    const isActive = members.indexOf(user?.email) !== -1;
  return (
    <div className='relative'>
       <div className='relative rounded-full overflow-hidden
       w-9 h-9 lg:w-11 lg:h-11'>

        <Image fill alt=""
        src={user?.image || '/images/placeholder.jpg'}
        
        ></Image>




       </div>

       {isActive ? (

            <span className='absolute 
            rounded-full block 
            bg-green-600 h-3 w-3 right-0 top-0
            '>


            </span>


       ): null}

      
        
        
    </div>
  )
}

export default Avatar