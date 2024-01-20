'use client';
import React, { useState } from 'react'
import Input from '../Inputs/Input';
import { useForm , FieldValues } from 'react-hook-form';

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
  
  return (
    <div className='mt-10 mx-auto w-full max-w-md'>
      
      <div className='bg-slate-100 shadow-xl rounded-xl px-10 py-6'>

        <form className='space-y-5'>
          <Input id="name" 
          label='Name' 
          required
          register={register}
          errors={errors}
          disabled={isLoading} 
          type='text'
           ></Input>




        </form>



      </div>
      
      
      </div>
  )
}

export default AuthForm