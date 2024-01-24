import Avatar from '@/components/Avatar';
import { User } from '@prisma/client'
import React from 'react'

interface UserBoxProps{
    data : User;
}

const UserBox:  React.FC<UserBoxProps>=({data})=> {
  return (
    <div className='w-full relative flex items-center space-x-3
    bg-white p-3 rounded-lg transition hover:bg-slate-100 cursor-pointer'>
        
        <Avatar user={data.image}></Avatar>

        <div className='min-w-0 flex-1'>
            <div className='focus:outline-none'>
                <span className='absolute inset-0' 
                aria-hidden="true"> </span>
                <div className='flex items-center mb-1'>
                    <p className='text-sm font-medium text-gray-900'> {data.name}</p>
                </div>

            </div>


        </div>


    </div>
  )
}

export default UserBox