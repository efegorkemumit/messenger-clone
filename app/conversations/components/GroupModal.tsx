'use client'
import Button from '@/app/(site)/components/Buttons/Button';
import Input from '@/app/(site)/components/Inputs/Input';
import Select from '@/components/Select';
import Modal from '@/components/modals/Modal';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { Field, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface GroupModalProps{
    isOpen?:boolean;
    onClose:()=>void;
    users:User[];
}

const GroupModal: React.FC<GroupModalProps>=({onClose, users, isOpen})=> {

    const [isLoading, setIsLoading]= useState(false)

    const router = useRouter();

    const{
        register, handleSubmit, setValue, watch, formState:{
            errors,
        }


    }= useForm<FieldValues>({
        defaultValues:{
            name:'',
            members:[]
        }
    });

    const members = watch('members');

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
      
        axios.post('/api/conversations', {
          ...data,
          isGroup: true
        })
        .then(() => {
          router.refresh();
          onClose();
        })
        .catch(() => toast.error('Something went wrong!'))
        .finally(() => setIsLoading(false));
      }



  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        
       <form onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-6'>
            <div className='border-b border-gray-500 pb-12'>
                <h2 className='text-base font-semibold'>  
                Create a Group chat
                </h2>
                <p>Create a chat with more 2 people</p>

                <div className='mt-10 flex flex-col gap-y-2'>

                <Input 
                label='Name' 
                id='name' 
                errors={errors} 
                required 
                disabled={isLoading}
                register={register}
                type='text'
                > </Input>

                <Select label='members'
                  disabled={isLoading}
                  options={users.map((user)=>({
                    value:user.id,
                    label:user.name
                  }))}

                  value={members}
                  onChange={(value)=>setValue('members', value,{
                    shouldValidate:true
                  })}
                  
                  >

                </Select>


                </div>


<div className=' mt-6 flex items-center justify-end gap-5'>

  

<Button 
    disabled={isLoading}
    
    type='button'
    onClick={onClose}
    
    >Cancel</Button>


<Button 
    disabled={isLoading}
    danger
    type='submit'
    
    
    >Create</Button>




</div>





            </div>
        </div>



       </form>
        
        </Modal>
  )
}

export default GroupModal