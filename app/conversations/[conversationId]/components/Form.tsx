'use client'

import React from 'react'
import MessagesInput from './MessagesInput'
import useConversation from '@/app/hook/action/useConversation'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { HiPaperAirplane } from 'react-icons/hi';
import axios from 'axios';
import { CldUploadButton } from 'next-cloudinary';
import { HiPhoto } from 'react-icons/hi2';


function Form() {

    const {conversationId} = useConversation();

    const{
        register,
        handleSubmit, 
        setValue, 
        formState:{
        errors
        }
    } = useForm<FieldValues>({
        defaultValues:{
            message : ''
        }
    });

    const onSubmit :SubmitHandler<FieldValues> = (data)=>{
        setValue('message', '', {shouldValidate:true});
        axios.post('/api/messages', {
            ...data,
            conversationId : conversationId
        })
    }
    const handleUpload = (result:any)=>{

        axios.post('/api/messages', {
            image:result.info.secure_url,
            conversationId : conversationId
        })

    }



  return (
    <div className='py-4 px-4
    border-t-2 flex items-center gap-2
    w-full bg-white'>

<CldUploadButton
  options={{maxFiles:1}}
  onUpload={handleUpload}
  uploadPreset='jpsikaru'
  >

    <HiPhoto size={42} className='text-sky-600
            cursor-pointer hover:text-sky-800' ></HiPhoto>
  </CldUploadButton>
        
        <form onSubmit={handleSubmit(onSubmit)} className='w-full gap-2 items-center flex'>

            <MessagesInput id='message' placeHolder='Write a message'
            required errors={errors} register={register}>

            </MessagesInput>

            <button type='submit' className='rounded-lg bg-sky-600
            cursor-pointer hover:bg-sky-800 transition px-2 py-2'>
              
              <HiPaperAirplane 
              size={25} 
              className='text-white'>

              </HiPaperAirplane>

            </button>


            </form>
        
        </div>
  )
}

export default Form