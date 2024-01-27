import getConversationById from '@/app/hook/getConversationById';
import EmptyState from '@/components/EmptyState';
import React from 'react'
import Header from './components/Header';


interface IParams{
  conversationId:string;
}

const ChatId=async({params}: {params:IParams})=> {

  const conversation = await getConversationById(params.conversationId)

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
    <div className='lg:pl-80 h-full'>
       <div className='h-full flex flex-col'>
         <Header conversation={conversation}></Header>
       </div>
      
    </div>
  )
}

export default ChatId