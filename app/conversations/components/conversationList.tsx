import { FullConversationType } from '@/app/type'
import { User } from '@prisma/client';
import React from 'react'


interface ConversationListProps{
    initalItems : FullConversationType[];
    users: User[];
    title?:string;
}


const ConversationList: React.FC<ConversationListProps> =({
    initalItems, users, title
})=> {
  return (
    <div>ConversationList</div>
  )
}

export default ConversationList