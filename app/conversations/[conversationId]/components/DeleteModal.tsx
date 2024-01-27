import Button from '@/app/(site)/components/Buttons/Button';
import useConversation from '@/app/hook/action/useConversation';
import Modal from '@/components/modals/Modal';
import { Dialog } from '@headlessui/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast';
import { FiAlertTriangle } from 'react-icons/fi';

interface DeleteModalProps{
    isOpen?:boolean;
    onClose:() =>void;
}

const DeleteModal:React.FC<DeleteModalProps>=({onClose, isOpen})=> {

    const router = useRouter();
    const {conversationId} = useConversation();

    const [isLoading, setIsLoading]=useState(false);

    const handleOnDelete = useCallback(()=>{

        setIsLoading(true);
        axios.delete(`/api/conversations/${conversationId}`)
        .then(()=>{
            onClose();
            router.push('/conversations');
            router.refresh();
        })
        .catch(()=>toast.error('something Wrong'))
        .finally(()=>setIsLoading(false))


    }, [router, conversationId, onClose])
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <div className='flex items-start'>
            <div className='mx-auto flex h-12 w-12 flex-shrink-0
            items-center justify-center rounded-full bg-red-600
            sm:mx-0'>

                <FiAlertTriangle className='text-red-100 h-7 w-7'></FiAlertTriangle>
            </div>


            <div className='mt-3 text-center sm:ml-4
            sm:mt-0 sm:text-left'>
                    <p className='font-semibold
                    text-base text-gray-700'>Delete Conversation</p>
             <div className='mt-2 '>
                
                Are you sure ? 

                </div>
            
            
            </div>


           
            

          

        </div>

        
        <div className='mt-5 flex gap-3 items-center justify-center'>
                <Button danger onClick={handleOnDelete} disabled={isLoading}>
                    Delete
                </Button>

                <Button onClick={onClose} disabled={isLoading}>
                    Cancel
                </Button>


        </div>

        

        
    
    </Modal>
  )
}

export default DeleteModal