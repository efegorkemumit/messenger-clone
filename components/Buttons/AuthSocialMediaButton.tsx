import React from 'react'
import { IconType } from 'react-icons'


interface AuthSocialMediaButtonProps{
    icon:IconType;
    onClick?:()=>void;
}


const AuthSocialMediaButton: React.FC<AuthSocialMediaButtonProps>=({
    icon:Icon, onClick
})=> {
  return (
    <button type='button' onClick={onClick} 
    className='w-full justify-center inline-flex rounded-xl bg-white
    px-4 py-3 text-gray-900 shadow-sm ring-inset ring-gray-700
    hover:bg-gray-100 transition'>
        
        
        <Icon/>
    </button>
  )
}

export default AuthSocialMediaButton