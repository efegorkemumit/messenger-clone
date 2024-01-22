'use client';
import React, { useCallback, useEffect, useState } from 'react'
import Input from '../Inputs/Input';
import { useForm , FieldValues, SubmitHandler } from 'react-hook-form';
import Button from '../Buttons/Button';
import { FaGoogle, FaGithub } from "react-icons/fa";
import AuthSocialMediaButton from '../Buttons/AuthSocialMediaButton';
import toast, { Toaster } from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';


type Variant = 'LOGIN' | 'REGISTER';
function AuthForm() {

  const [variant, SetVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const session = useSession();

  useEffect(()=>{
    if(session?.status ==='authenticated'){
      router.push('/conversations')
    }
  },[session?.status, router])

  const socialAction = (action :string)=>{
    setIsLoading(true);

    signIn(action,{redirect:false}).then((calback)=>{
      if(calback?.error){
        toast.error("Invalid Credentials")
      }
      if(calback?.ok){
       router.push('/conversations')
      }
    })
    .finally(()=>setIsLoading(false));

  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues:{
      name:'',
      email: '',
      password:''
    }
  });

  const onSubmit : SubmitHandler<FieldValues> = (data) =>{

    setIsLoading(true);

    if(variant =="REGISTER"){
      axios.post("/api/register", data).then(()=>
      signIn('credentials', {
        ...data,
        redirect:false,
      }))
      .then((calback)=>{
        if(calback?.error){
          toast.error("Invalid Credentials")
        }

        if(calback?.ok){
         router.push('/conversations')
        }
      })
      .catch(()=> toast.error("Something went wrong"))
      .finally(()=>setIsLoading(false));
     

    }

    if(variant =="LOGIN"){

      signIn('credentials', {
        ...data,
        redirect:false,
      })
      .then((calback)=>{
        if(calback?.error){
          toast.error("Invalid Credentials")
        }

        if(calback?.ok){
         router.push('/conversations')
        }
      })
      .catch(()=> toast.error("Something went wrong"))
      .finally(()=>setIsLoading(false));
    

    }
  }

  const toggleVariant = useCallback(()=>{
    if(variant== 'LOGIN'){
      SetVariant('REGISTER')
    }else{
      SetVariant('LOGIN');
    }

  },[variant])
  
  return (
    <div className='mt-10 mx-auto w-full max-w-md'>
      
      <div className='bg-slate-100 shadow-xl rounded-xl px-10 py-6'>


        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>

          {variant === 'REGISTER' &&(

              <Input id="name" 
              label='Name' 
              required
              register={register}
              errors={errors}
              disabled={isLoading} 
              type='text'
              ></Input>

          )}
         

        <Input id="email" 
          label='Email Address' 
          required
          register={register}
          errors={errors}
          disabled={isLoading} 
          type='email'
           ></Input>

        <Input id="password" 
          label='Enter Password' 
          required
          register={register}
          errors={errors}
          disabled={isLoading} 
          type='password'
           ></Input>

           <div>
            <Button fullWidth type='submit' disabled={isLoading}>

            {variant =='LOGIN' ? 'Sign in':'Register'}

            </Button>


           </div>

           <div className='mt-8'>

            <div className='w-full border-t border-gray-500'></div>

            <div className='relative flex justify-center text-sm'>
            <span className='px-2 py-2'>  Or contunie With </span> 
            </div>

            <div className='flex gap-3'>
                  <AuthSocialMediaButton
                  icon={FaGithub} onClick={()=>socialAction('github')}>
                    
                  </AuthSocialMediaButton>


                  <AuthSocialMediaButton
                  icon={FaGoogle} onClick={()=>socialAction('google')}>
                    
                  </AuthSocialMediaButton>

            </div>

           


           </div>


        <div className='flex gap-3 justify-center text-sm mt-8
        text-gray-700'>
           <div>
            {variant =='LOGIN' ? 'New to messseger':'Already have a account'}
           </div>

           <div className='cursor-pointer underline' onClick={toggleVariant}>

           {variant =='LOGIN' ? 'Create Account':'LOGIN'}


           </div>

        </div>





        </form>



      </div>
      
      
      </div>
  )
}

export default AuthForm