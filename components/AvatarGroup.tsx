'use client'


import { User } from '@prisma/client'
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react'

interface AvatarGroupProps{
    users?: User[];
}

const AvatarGroup:React.FC<AvatarGroupProps> =({ users= []}) => {

    const slicedUsers= users.slice(0,3);

    const PositionMap = {
        0: 'top-0 left-[12px]',
        1: 'bottom-0',
        2: 'bottom-0 right-0'


    }


  return (
    <div className='relative h-11 w-11'>
      {slicedUsers.map((user, index) => (
    <div key={user.id} className={clsx(` h-[24px] w-[24px] absolute rounded-full overflow-hidden`, PositionMap[index as keyof typeof PositionMap])}>
        <Image fill src={user?.image || '/images/placeholder.jpg'} alt='Avatar Group' />
    </div>
))}


    </div>
  )
}

export default AvatarGroup