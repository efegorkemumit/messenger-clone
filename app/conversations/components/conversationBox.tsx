import useotherUser from '@/app/hook/action/useOtherUser';
import { FullConversationType } from '@/app/type'
import Avatar from '@/components/Avatar';
import clsx from 'clsx';
import React from 'react'

interface ConversationBoxProps{
    data:FullConversationType,
    selected?: boolean;

}

const ConversationBox : React.FC<ConversationBoxProps>=({
    data, selected
}) =>{

  const otherUser = useotherUser(data);
  return (
    <div className={clsx(`w-full relative flex items-center space-x-3
    p-3 hover:bg-slate-200 rounded-xl cursor-pointer `)}>


      <Avatar user={data}></Avatar>


      <div className='min-w-0 flex-1'>
        <div className='focus:outline-none'>
        
        <div className='flex justify-between items-center mb-1'>
          <p className='text-sm font-medium text-gray-500'>{data.name || otherUser.name}</p>
        </div>



        </div>


      </div>



    </div>
  )
}

export default ConversationBox