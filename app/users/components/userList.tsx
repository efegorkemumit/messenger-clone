'use client'

import { User } from '@prisma/client'
import React from 'react'
import UserBox from './userBox';


interface UserListProps{
    items:User[];
}

const UserList: React.FC<UserListProps>=({items})=> {
  return (
    <aside className='
    fixed 
    inset-y-0 
    pb-20
    lg:left-20
    lg:w-80
    overflow-y-auto
    border-r
    border-gray-200
    block
    w-full
bg-white
    
    '>
        <div className='px-5'>

            <div className='flex-col'>

                <div className='text-2xl font-semibold py-4'>
                    People

                </div>
            </div>

            {items.map((item)=>(

               <UserBox key={item.id} data={item}>

               </UserBox>


            ))}
        

        </div>
        
        
        
        </aside>
  )
}

export default UserList