import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import clsx from 'clsx';

interface InputProps{
    label:string;
    id:string;
    type?:string;
    required?:boolean;
    register:UseFormRegister<FieldValues>;
    errors:FieldErrors;
    disabled? :boolean;

}

const Input: React.FC<InputProps>= ({label, id, errors , 
    register ,disabled, required, type})=> {
  return (
    <div>
 
        <label htmlFor={id} className='block text-sm font-medium text-gray-800'>
            {label}
            </label>
        <input  id={id} 
                type={type} 
                autoComplete={id} 
                disabled={disabled} 
                {...register(id,{required})}
                className={clsx(`block w-full
                rounded-md mt-2 py-1.5
                 text-gray-900 shadow-sm ring-1 ring-inset
                 ring-gray-300 placeholder:text-gray-400`,
                 errors[id] && 'focus:ring-rose-600',
                 disabled && 'opacity-45 cursor-default')}>


        </input>
        
      
        
        
        </div>
  )
}

export default Input