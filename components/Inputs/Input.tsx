import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

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

        <label>{label}</label>
        <input></input>
        
      
        
        
        </div>
  )
}

export default Input