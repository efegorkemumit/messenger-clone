'use client';
import React, { useCallback, useState } from 'react'
import Input from '../Inputs/Input';
import { useForm , FieldValues, SubmitHandler } from 'react-hook-form';
import Button from '../Buttons/Button';

type Variant = 'LOGIN' | 'REGISTER';
function AuthForm() {

  const [variant, SetVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

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

    if(variant =="REGISTER"){
      console.log("register")
    }

    if(variant =="LOGIN"){
      console.log("register")
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

        <form className='space-y-5'>

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