import Link from 'next/link';
import React from 'react'
import clsx from 'clsx';

interface DesktopItemProps{
    label:string;
    icon:any;
    href:string;
    onClick?:()=>void;
    active?:boolean;
}

const DesktopItem: React.FC<DesktopItemProps>=({
    label, href, icon:Icon, active, onClick
})=> {

    const handleClick = ()=>{
        if(onClick){
            return onClick();
        }
    }
  return (
    <li onClick={handleClick} key={label}>
        
        <Link href={href} className=
        {clsx(`flex gap-x-4 rounded-md p-4 
        text-sm font-semibold text-gray-600 hover:text-black
        hover:bg-gray-100`,
        active && 'bg-gray-100 text-black'
        
        )}
        
        
        >

            <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />

            <span  className='sr-only'>{label}</span>
        
        </Link>

        
        
        
    </li>
  )
}

export default DesktopItem