import getConversationById from '@/app/hook/getConversationById';
import EmptyState from '@/components/EmptyState';
import React from 'react'
import Header from './components/Header';
import Form from './components/Form';
import getMessages from '@/app/hook/getMessage';
import Body from './components/Body';


interface IParams{
  conversationId:string;
}

const ChatId=async({params}: {params:IParams})=> {

  const conversation = await getConversationById(params.conversationId)
  const messages = await getMessages(params.conversationId)
  if(!conversation){
    return(
   
      <div className='lg:pl-80 h-full'>
        <div className='h-full flex flex-col'>
          <EmptyState></EmptyState>
        </div>

      </div>

     
    )
  }
  return (
    <div className='lg:pl-[25rem] h-full'>
       <div className='h-full flex flex-col'>
         <Header conversation={conversation}></Header>
         <Body initalMessages={messages}></Body>

         <Form></Form>
       </div>
      
    </div>
  )
}

export default ChatId