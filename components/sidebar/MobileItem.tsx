import Link from 'next/link';
import React from 'react'
import clsx from 'clsx';

interface MobileItemProps{
    label:string;
    icon:any;
    href:string;
    onClick?:()=>void;
    active?:boolean;
}

const MobileItem: React.FC<MobileItemProps>=({
    href, icon:Icon, label, active, onClick
})=> {


    const handleClick = ()=>{
        if(onClick){
            return onClick();
        }
    }


  return (
    <Link onClick={handleClick} href={href} 
    className={clsx(`group flex gap-x-3 
    text-sm font-semibold justify-center w-full p-4 text-gray-600 hover:text-black
    hover:bg-gray-100 `,
    active && 'bg-gray-100 text-black'
    
    )}
    
    >
    
     <Icon className="h-6 w-6" />

    
    </Link>

    )
}

export default MobileItem