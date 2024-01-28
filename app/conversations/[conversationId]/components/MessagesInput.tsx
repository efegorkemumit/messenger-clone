'use client'
import React from 'react'
import { FieldErrors, FieldValue, FieldValues, UseFormRegister } from 'react-hook-form';


interface MessagesInputProps{

    placeHolder?:string;
    id:string;
    type?:string;
    required?:boolean;
    register: UseFormRegister<FieldValues>,
    errors : FieldErrors

}
const MessagesInput:React.FC<MessagesInputProps>= ({
    errors, id ,register, placeHolder, required, type
})=> {
  return (
    <div className='w-full relative'>
        <input 
        id={id}
        placeholder={placeHolder}
        type={type}
        autoComplete={id}
        {...register(id, {required})}
        
        
        className='text-black font-light 
        py-2 px-4 bg-slate-200 w-full rounded-full'
        ></input>
        
        
        
    </div>
  )
}

export default MessagesInput