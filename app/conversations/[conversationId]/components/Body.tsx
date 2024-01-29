'use client'
import { FullMessageType } from '@/app/type'
import React, { useEffect, useRef, useState } from 'react'
import MessageBox from './MessageBox';
import useConversation from '@/app/hook/action/useConversation';
import axios from 'axios';
import { pusherClient } from '@/app/libs/pusher';

interface BodyProps{
    initalMessages : FullMessageType[];
}

const Body: React.FC<BodyProps>=({initalMessages})=> {

    const [messages, setMessages] = useState(initalMessages);

    const {conversationId} = useConversation();
    const bottomRef= useRef<HTMLDivElement>(null);
    
    useEffect(()=>{
      axios.post(`/api/conversations/${conversationId}/seen`)
    }, [conversationId])

    useEffect(()=>{
      pusherClient.subscribe(conversationId)
      bottomRef?.current?.scrollIntoView();

      const messageHandler =(message :FullMessageType)=>{

        axios.post(`/api/conversations/${conversationId}/seen`);

        setMessages((current)=>{
          if(find(current, {id:message.id})){
            return current;
          }
          return [...current, message]
        });

        bottomRef?.current?.scrollIntoView();
      }

      const updateMessageHandler = (newMessage: FullMessageType)=>{

        setMessages((current)=> current.map((currentMessage)=>{
          if(currentMessage.id === newMessage.id){
            return newMessage;
          }

          return currentMessage;


        }))

      };

      pusherClient.bind('messages:new', messageHandler)
      pusherClient.bind('message:update', updateMessageHandler);

      return()=>{
        pusherClient.unsubscribe(conversationId)
        pusherClient.unbind('messages:new', messageHandler)
        pusherClient.unbind('message:update', updateMessageHandler)
      }


    },[conversationId])

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

        <div className='pt-32' ref={bottomRef}></div>
    
    
    </div>
  )
}

export default Body