'use client'

import { FullConversationType } from '@/app/type'
import { User } from '@prisma/client';
import React, { useState } from 'react'
import ConversationBox from './conversationBox';


interface ConversationListProps{
    initalItems : FullConversationType[];
    users: User[];
    title?:string;
}


const ConversationList: React.FC<ConversationListProps> =({
    initalItems, users, title
})=> {

  const [items, setItems] = useState(initalItems);
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