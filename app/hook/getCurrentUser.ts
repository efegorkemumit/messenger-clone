import prismadb from '@/app/libs/prismadb'
import getSession from './getSession'


const getCurrentuser = async() =>{

    try{
        const session = await getSession();

        if(!session?.user?.email){
            return null;
        }

        const currentUser = await prismadb.user.findUnique({
            where :{
                email: session.user.email as string
            }

        })

        if(!currentUser){
            return null;
        }

        return currentUser;
    }
    catch(error:any){
        return null;
    }



}

export default getCurrentuser