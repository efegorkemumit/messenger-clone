import Sidebar from "@/components/sidebar/Sidebar";



export default function RootLayout({ children,}: Readonly<{
    children: React.ReactNode;}>) {

        
    return (

        <Sidebar>
     <div className=" h-full">
             {children}
     </div>
     </Sidebar>
  
  
        
    );
  }
  