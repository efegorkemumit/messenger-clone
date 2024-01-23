import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation"
import { useMemo } from "react";
import { HiChat, HiUser, HiLogout } from "react-icons/hi";
import useConversation from "./useConversation";

const useRoutes = ()=>{

    const pathname = usePathname();

    const { conversationid} = useConversation();
    

    const routes = useMemo(()=>[
        {
            label:'Chat',
            href:'/conversations',
            icon: HiChat,
            active:pathname === '/conversations' || !!conversationid


        },

        {
            label:'Users',
            href:'/users',
            icon: HiUser ,
            active:pathname === '/users'
        },

        {
            label:'Logout',
            onClick:()=>signOut(),
            href:'#',
            icon: HiLogout ,
        }




    ], [pathname, conversationid])

    return routes;


}

export default useRoutes