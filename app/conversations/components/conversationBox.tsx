import useOtherUser from '@/app/hook/action/useOtherUser';
import { FullConversationType } from '@/app/type'
import Avatar from '@/components/Avatar';
import AvatarGroup from '@/components/AvatarGroup';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react'

interface ConversationBoxProps{
    data:FullConversationType,
    selected?: boolean;

}

const ConversationBox : React.FC<ConversationBoxProps>=({
    data, selected
}) =>{

  const otherUser = useOtherUser(data);

  const router = useRouter();
  const session = useSession();


  const handleClick = useCallback(()=>{
    router.push(`/conversations/${data.id}`);
  }, [data, router]);


  const userEmail = useMemo(()=>session.data?.user?.email,
  [session.data?.user?.email])

  const lastMessage = useMemo(()=>{
    const messages = data.messages || [];

    return messages[messages.length-1];
  },[data.messages]);

  const hasSeen = useMemo(()=>{
    if(!lastMessage){
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if(!userEmail)
    {
      return false;
    }

    return seenArray.filter((user)=>user.email === userEmail).length !==0;
  

  }, [userEmail, lastMessage])

  const lastMessageText = useMemo(()=>{
    if(lastMessage?.image){
      return 'sent a image'
    }

    if(lastMessage?.body){
      return lastMessage?.body
    }

    return 'started Conversation';



  },[lastMessage])


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
          <p className='text-sm font-medium text-gray-500'>
            {data.name || (otherUser && otherUser.name)}
          </p>
       
     {lastMessage?.createdAt &&(

<p className='text-sm text-gray-300 font-light'>
{format(new Date(data.createdAt), "p")}



</p>   



     )}


        </div>

        <p className={clsx(`text-sm truncate`,
        hasSeen ? 'text-gray-500' : 'text-black font-medium'
        
        )}>
  {lastMessageText}


</p>


        </div>


      </div>



    </div>
  )
}

export default ConversationBox