'use client'
import { FullMessageType } from '@/app/type'
import React, { useState } from 'react'
import MessageBox from './MessageBox';

interface BodyProps{
    initalMessages : FullMessageType[];
}

const Body: React.FC<BodyProps>=({initalMessages})=> {

    const [messages, setMessages] = useState(initalMessages);
  return (
    <div className='flex-1 overflow-y-auto'>

        {messages.map((message, i)=>(
            <MessageBox
            isLast={i=== messages.length -1}
            data={message}
            >

            </MessageBox>

        ))}
    
    
    </div>
  )
}

export default Body