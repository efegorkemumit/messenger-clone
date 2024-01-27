'use client'
import useotherUser from '@/app/hook/action/useOtherUser'
import { Conversation, User } from '@prisma/client'
import React from 'react'


interface HeaderProps{
    conversation:Conversation & {
        users:User[]
    }
}
const Header:React.FC<HeaderProps>=({conversation})=> {

    const otherUser= useotherUser(conversation)

  return (
    <div>Header</div>
  )
}

export default Header