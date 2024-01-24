import Sidebar from "@/components/sidebar/Sidebar";
import React from "react";
import getUsers from "../hook/getUsers";
import UserList from "./components/userList";



export default async function UserLayout({
    children
}: {
    children:React.ReactNode,
}){

    const  users = await getUsers();
    return (

    <Sidebar>
            <div className=" h-full">
            <UserList items={users}></UserList>

                    {children}
            </div>
     </Sidebar>
  
  
        
    );

}
