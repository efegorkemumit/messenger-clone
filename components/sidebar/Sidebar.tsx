import getCurrentuser from "@/app/hook/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar";

async function Sidebar ({    children,}: Readonly<{
    children: React.ReactNode;
  }>) {

    const currentUser = await getCurrentuser();
    return (
            <div className="h-full">

                <DesktopSidebar currentUser={currentUser}></DesktopSidebar>

                <main className="h-full">
                {children}
                </main>
           
            </div>
      
    );
  }

  export default Sidebar
  
  