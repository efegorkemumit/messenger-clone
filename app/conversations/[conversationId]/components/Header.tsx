'use client'
import useActiveList from '@/app/hook/action/useActiveList'
import useotherUser from '@/app/hook/action/useOtherUser'
import Avatar from '@/components/Avatar'
import AvatarGroup from '@/components/AvatarGroup'
import { Conversation, User } from '@prisma/client'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2'
import Profile from './Profile'


interface HeaderProps{
    conversation:Conversation & {
        users:User[]
    }
}
const Header:React.FC<HeaderProps>=({conversation})=> {

    const otherUser= useotherUser(conversation)
    const  {members} = useActiveList();
    const isActive = members.indexOf(otherUser?.email) !== -1;
    const [profileOpen, setProfileOpen] = useState(false)

    const statusText = useMemo(()=>{
      if(conversation.isGroup){
        return `${conversation.users.length} members`;
      }
      return isActive ? 'Active' : 'Offline'
    }, [conversation, isActive])

  return (
    <>

    <Profile data={conversation} isOpen={profileOpen}
    onClose={()=>setProfileOpen(false)} ></Profile>


    <div className='bg-white w-full flex border-b-2 shadow-md
    px-3 py-4 justify-between items-center'>
      <div className='flex gap-3 items-center'>
        <Link className='lg:hidden block text-sky-500 hover:text-sky-700' href='/conversations'>
          <HiChevronLeft size={18}></HiChevronLeft>
        </Link>

        {conversation.isGroup? (
          <AvatarGroup users={conversation.users}></AvatarGroup>
        ):
        (
          <Avatar user={otherUser}></Avatar>
        )}

        <div className='flex flex-col'>
          <div>{conversation.name || otherUser.name}</div>

          <div>
            {statusText}
          </div>

        </div>

       


        </div>

        <HiEllipsisHorizontal
        onClick={()=>setProfileOpen(true)}  className=' cursor-pointer text-sky-500 hover:text-sky-700'
        size={25}>

        </HiEllipsisHorizontal>

      
      </div>

      </>
  )
}

export default Header