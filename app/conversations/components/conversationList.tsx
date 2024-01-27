'use client'

import { FullConversationType } from '@/app/type'
import { User } from '@prisma/client';
import React, { useState } from 'react'
import ConversationBox from './conversationBox';
import { MdOutlineGroupAdd } from 'react-icons/md';
import useConversation from '@/app/hook/action/useConversation';
import clsx from 'clsx';


interface ConversationListProps{
    initalItems : FullConversationType[];
    users: User[];
    title?:string;
}


const ConversationList: React.FC<ConversationListProps> =({
    initalItems, users, title
})=> {

  const [items, setItems] = useState(initalItems);

  const {isOpen} =useConversation();
  return (

    <aside className={clsx(`fixed 
    inset-y-0 
    pb-20
    lg:left-20
    lg:w-80
    lg:block
    overflow-y-auto
    border-r
    border-gray-200
bg-white`,
isOpen ? 'hidden':'block w-full left-0')}
    >
        <div className='px-5'>

            <div className='flex justify-between mb-4 pt-4'>

                <div className='text-2xl font-semibold py-4'>
                    {title}

                </div>
                <div className='p-5 bg-gray-100 
                rounded-full transition cursor-pointer text-gray-800 hover:opacity-65 '>

                  <MdOutlineGroupAdd size={20}/>
                </div>
            </div>

            {items.map((item)=>(

                <ConversationBox
                key={item.id}
                data={item}
                
                ></ConversationBox>


            ))}
        

        </div>
        
        
        
        </aside>
  )
}

export default ConversationList