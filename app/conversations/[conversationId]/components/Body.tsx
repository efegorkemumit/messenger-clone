'use client'
import { FullMessageType } from '@/app/type'
import React, { useEffect, useState } from 'react'
import MessageBox from './MessageBox';
import useConversation from '@/app/hook/action/useConversation';
import axios from 'axios';

interface BodyProps{
    initalMessages : FullMessageType[];
}

const Body: React.FC<BodyProps>=({initalMessages})=> {

    const [messages, setMessages] = useState(initalMessages);

    const {conversationId} = useConversation();
    
    useEffect(()=>{
      axios.post(`/api/conversations/${conversationId}/seen`)
    }, [conversationId])
  return (
    <div className='flex-1 overflow-y-auto'>

        {messages.map((message, i)=>(
            <MessageBox
            isLast={i=== messages.length -1}
            key={message.id}
            data={message}
            >

            </MessageBox>

        ))}
    
    
    </div>
  )
}

export default Body