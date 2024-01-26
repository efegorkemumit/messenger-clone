import prismadb from '@/app/libs/prismadb'
import getCurrentuser from './getCurrentUser';


const getConversationById = async(
    conversationId:string
)=>{

    try{

        const currentUser = await getCurrentuser();

        if(!currentUser?.id || !currentUser?.email)
        {
            return null;

        }

        const conversation  = await prismadb.conversation.findUnique({

            where: {
                id:conversationId
            },
            include:{
                users:true
            }


        });

        return conversation;

    }
    catch(error:any){
        return null;
    }



}

export default getConversationById;