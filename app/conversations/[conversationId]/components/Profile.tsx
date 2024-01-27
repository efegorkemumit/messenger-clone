import useotherUser from '@/app/hook/action/useOtherUser';
import Avatar from '@/components/Avatar';
import AvatarGroup from '@/components/AvatarGroup';
import { Dialog, Transition } from '@headlessui/react';
import { Conversation, User } from '@prisma/client';
import React, { Fragment, useMemo } from 'react'
import { IoClose, IoTrash } from 'react-icons/io5';

interface ProfileProps{
    isOpen:boolean;
    onClose:() =>void;
    data:Conversation & {
        users:User[]
    }
}

const Profile:React.FC<ProfileProps>=({data, isOpen, onClose})=> {

    const otherUser = useotherUser(data);

    const title = useMemo(()=>{
        return data.name || otherUser.name;
    },[data.name, otherUser.name]);
  return (
    <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
            <Transition.Child
               as={Fragment}
               enter="ease-out duration-500"
               enterFrom="opacity-0"
               enterTo="opacity-100"
               leave="ease-in duration-500"
               leaveFrom="opacity-100"
               leaveTo="opacity-0"
             >
                    <div className='bg-black bg-opacity-35 fixed inset-0'></div>
            </Transition.Child>

            <div className=' fixed inset-0 overflow-hidden'>
                <div className='overflow-hidden absolute inset-0'>

                    <div className=' h-full fixed right-0 flex max-w-full pl-10'>
                    <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >

                    <Dialog.Panel className="max-w-md w-screen">

                        <div className='bg-white shadow-lg  h-full flex flex-col overflow-y-auto py-6'>

                            <div className='px-4 py-2'>
                                <div className='flex items-start justify-end'>
                                    <div className='ml-3 flex h-8 items-center'>

                                        <button onClick={onClose} className='text-sky-600 hover:text-sky-800'>

                                            <IoClose size={25}></IoClose>
                                        </button>
                                    </div>

                                </div>

                                <div className=' relative mt-6 flex-1 '>
                                    <div className=' flex items-center justify-center'>
                                            <div className='mb-2 '>
                                            {data.isGroup ? <AvatarGroup users={data.users}/>
                                            : <Avatar  user={otherUser}/>}
                                            </div>
                                    </div>
                                    <div className=' flex items-center justify-center'>

                                            <div className='mb-2'>
                                            {title}
                                                </div>

                                    </div>

                                    <div className=' cursor-pointer flex flex-col gap-5 my-8   items-center justify-center'>
                                        <div className='text-center justify-center mt-12  items-center'>
                                        <IoTrash size={35}></IoTrash>
                                        </div>
                                        <div className='text-center justify-center  items-center'>
                                                Delete                                       
                                         </div>
                                    </div>


                                    <div className='w-full pb-5 pt-5 '>
                                        <div className='space-y-3 space-x-3'>

                                            {data.isGroup &&(
                                              <div>
                                              <div className='text-center mb-12 mt-3'>
                                              <dt className='text-sm font-medium'>Email
                                                  </dt>
                                                  <dd>{data.users.map((user)=>user.email).join(',')}</dd>

                                              </div>

                                          
                                              
                                          </div>
                                            )}

                                            {!data.isGroup &&(
                                                <div>
                                                    <div className='text-center mb-12 mt-3'>
                                                    <dt className='text-sm font-medium'>Email
                                                        </dt>
                                                        <dd>{otherUser.email}</dd>

                                                    </div>

                                                
                                                    
                                                </div>
                                                
                                                
                                            )}

                                            

                                        </div>
                                     
                                                                


                                    </div>
                                    

                                    
                                </div>



                            </div>
                        </div>



                    </Dialog.Panel>


  </Transition.Child>
                    </div>



                </div>


            </div>
        </Dialog>
    </Transition.Root>
  )
}

export default Profile