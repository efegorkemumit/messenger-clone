import Sidebar from "@/components/sidebar/Sidebar";
import ConversationList from "./components/conversationList";
import getConversations from "../hook/getConversations";
import getUsers from "../hook/getUsers";



export default async function ConversationLayout({
  children
}: {
  children:React.ReactNode,
}){

        
      const conversations = await getConversations();
      const users = await getUsers();

    return (
      <Sidebar>
          <div className=" h-full">
          <ConversationList initalItems={conversations}
          title="Messages" users={users}/>
                  {children}
          </div>
     </Sidebar>
  
  
        
    );
  }
  