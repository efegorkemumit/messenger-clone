'use client'
import EmptyState from '@/components/EmptyState'
import React from 'react'
import useConversation from '../hook/action/useConversation'
import clsx from 'clsx';

const Page=()=> {

  const {isOpen} = useConversation();
  return (
    <div className={clsx(
      'lg:pl-80 h-full lg:block',
      isOpen ? 'block':'hidden'


    )}><EmptyState></EmptyState>


    </div>


  )
}

export default Page