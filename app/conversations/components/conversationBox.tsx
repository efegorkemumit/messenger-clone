import useotherUser from '@/app/hook/action/useOtherUser';
import { FullConversationType } from '@/app/type'
import Avatar from '@/components/Avatar';
import AvatarGroup from '@/components/AvatarGroup';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react'

interface ConversationBoxProps{
    data:FullConversationType,
    selected?: boolean;

}

const ConversationBox : React.FC<ConversationBoxProps>=({
    data, selected
}) =>{

  const otherUser = useotherUser(data);

  const router = useRouter();

  const handleClick = useCallback(()=>{
    router.push(`/conversations/${data.id}`);
  }, [data, router]);


  return (
    <div onClick={handleClick} className={clsx(`w-full relative flex items-center space-x-3
    p-3 hover:bg-slate-200 rounded-xl cursor-pointer `)}>


      {data.isGroup ?(
        <AvatarGroup users={data.users}></AvatarGroup>

      ):(
        <Avatar user={otherUser}></Avatar>

      )}


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