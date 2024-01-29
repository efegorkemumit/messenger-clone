'use client'
import Input from '@/app/(site)/components/Inputs/Input';
import Modal from '@/components/modals/Modal';
import { User } from '@prisma/client';
import React, { useState } from 'react'
import { Field, FieldValues, useForm } from 'react-hook-form';

interface GroupModalProps{
    isOpen?:boolean;
    onClose:()=>void;
    users:User[];
}

const GroupModal: React.FC<GroupModalProps>=({onClose, users, isOpen})=> {

    const [isLoading, setIsLoading]= useState(false)

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
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        
       <form>
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


                </div>



            </div>
        </div>



       </form>
        
        </Modal>
  )
}

export default GroupModal