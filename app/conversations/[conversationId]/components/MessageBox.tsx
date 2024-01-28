'use client'

import { FullMessageType } from '@/app/type'
import Avatar from '@/components/Avatar';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import { compareAsc, format } from "date-fns";
import Image from 'next/image';
import ImageModal from './ImageModal';

interface MessageBoxProps{
    data: FullMessageType;
    isLast?: boolean;
}

const  MessageBox : React.FC<MessageBoxProps>=({
    data, isLast
})=> {

    const session = useSession();

    const [imageModalOpen, setImageModalOpen ] =useState(false);

    const isOwn = session.data?.user?.email === data?.sender?.email


    const container =  clsx('flex gap-3 p-4', isOwn && 'justify-end')
    const avatar = clsx(isOwn && 'order-2');
    const body =  clsx('flex flex-col gap-2', isOwn && 'item-end');
    const message =  clsx('text-sm w-fit text-white',
     isOwn ? 'bg-sky-500 text-white' : 'bg-gray-800',
     data.image? 'rounded-md p-0': 'rounded-full py-2 px-3'
     );

  return (

    <div className={container}> 

            <div className={avatar}>
                <Avatar user={data.sender}></Avatar>
            </div>
            <div className={body}>
                <div className='flex items-center gap-2'>
                    <div className='text-sm text-gray-500'>
                        {data.sender.name}
                    </div>
                    <div className='text-sm text-gray-500'>
                    {format(new Date(data.createdAt), "p")}
                    </div>

                </div>


            </div>

            <div className={message}>

                <ImageModal src={data.image} isOpen={imageModalOpen}
                onClose={()=>setImageModalOpen(false)}>

                </ImageModal>


                {data.image ? (
                    <Image
                    alt=""
                    height="280"
                    width="280"
                    onClick={()=> setImageModalOpen(true)}
                    src={data.image}
                    className='object-cover hover:scale-110
                    transition'>

                    </Image>
                ): <div>{data.body}</div>}


            </div>

   
   
    </div>
  )
}

export default MessageBox