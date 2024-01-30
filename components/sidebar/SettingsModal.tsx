'use client'
import { User } from '@prisma/client';
import React, { useState } from 'react'
import Modal from '../modals/Modal';
import { useRouter } from 'next/navigation';
import { FieldValues, useForm } from 'react-hook-form';
import axios from 'axios';
import Input from '@/app/(site)/components/Inputs/Input';
import Image from 'next/image';
import { CldUploadButton } from 'next-cloudinary';
import Button from '@/app/(site)/components/Buttons/Button';

interface SettingsModalProps{
    isOpen?:boolean;
    onClose?:()=>void;
    currentUser: User;
}

const  SettingsModal: React.FC<SettingsModalProps>=({
    currentUser, isOpen, onClose
})=> {

    const [isLoading, setIsLoading]= useState(false)

    const router = useRouter();

    const{
        register, handleSubmit, setValue, watch, formState:{
            errors,
        }


    }= useForm<FieldValues>({
        defaultValues:{
            name:currentUser?.name,
            image:currentUser?.image
        }
    });

    const image = watch('image');

    const handleUpload =(result:any)=>{
        setValue('image', result.info.secure_url,{
            shouldValidate: true 
        })
    }

    const onSubmit:SubmitHandler<FieldValues> = (data)=>{
        setIsLoading(true);

        axios.post('/api/settings',{
            ...data,
            isGroup:true
        })
        .then(()=>{
            router.refresh();
            onClose();
        })
        .catch(()=>toast.error('something wrong'))
        .finally(()=>setIsLoading(false));



    }



  return (
   <Modal isOpen={isOpen} onClose={onClose}>
     <form onSubmit={handleSubmit(onSubmit)}>

        <div className='space-y-6'>
            <div className='border-b border-gray-300 pb-10'>
                <h2 className='text-base
                font-semibold text-gray-950'>Profile
                </h2>

                <p className='font-light mt-2 text-gray-500'>

                    Edit your public information
                </p>

                <div className='mt-12 flex flex-col gap-4'>

                <Input 
                label='Name' 
                id='name' 
                errors={errors} 
                required 
                disabled={isLoading}
                register={register}
                type='text'
                > </Input>

                <label className='mt-5 text-sm font-medium'>Photo</label>

                
                </div>

                <div className='mt-4 flex items-center gap-4'>
                    <Image alt="a" width={50} height={50}
                    className='rounded-full'
                    src={image || currentUser?.image ||'/images/placeholder.jpg'}>


                    </Image>
                    <CldUploadButton 
                    options={{maxFiles:1}}
                    onUpload={handleUpload}
                    uploadPreset='jpsikaru'>
                        <Button type='button' disabled={isLoading}> 
                        Change</Button>


                    </CldUploadButton>



                </div>

               




            </div>

            <div className='items-center flex mt-4 gap-6'>

                
<Button 
    disabled={isLoading}
    
    type='button'
    onClick={onClose}
    
    >Cancel</Button>


<Button 
    disabled={isLoading}
    danger
    type='submit'
    
    
    >Save</Button>

                </div>


        </div>

    </form>


   </Modal>
  )
}

export default SettingsModal