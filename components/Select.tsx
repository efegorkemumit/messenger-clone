import React from 'react'
import ReactSelect from 'react-select'

interface SelectProps{
    label:string;
    value?:Record<string, any>;
    onChange:(value: Record<string, any>)=>void;
    options: Record<string, any>[];
    disabled?:boolean;
}

const Select: React.FC<SelectProps>=({label,onChange, options, value, disabled})=> {
  return (
    <div>
         <label  className='block text-sm font-medium text-gray-800'>
            {label}
            </label>
        <ReactSelect
        isDisabled={disabled}
        value={value}
        onChange={onChange}
        options={options}
        isMulti
        menuPortalTarget={document.body}
        styles={{
            menuPortal:(base)=>({...base,zIndex:9999})
        }}
        className={{
            control:()=>'text-sm'
        }}
        
        ></ReactSelect>


    </div>
  )
}

export default Select