import { FullMessageType } from '@/app/type'
import React from 'react'

interface MessageBoxProps{
    data: FullMessageType;
    isLast?: boolean;
}

const  MessageBox : React.FC<MessageBoxProps>=({
    data, isLast
})=> {
  return (
    <div>MessageBox</div>
  )
}

export default MessageBox