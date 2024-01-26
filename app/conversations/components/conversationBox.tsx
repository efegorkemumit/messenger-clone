import { FullConversationType } from '@/app/type'
import React from 'react'

interface ConversationBoxProps{
    data:FullConversationType,
    selected?: boolean;

}

const ConversationBox : React.FC<ConversationBoxProps>=({
    data, selected
}) =>{
  return (
    <div>conversationBox</div>
  )
}

export default ConversationBox