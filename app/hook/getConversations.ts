import prismadb from '@/app/libs/prismadb'
import getCurrentuser from './getCurrentUser'


const getConversations = async ()=>{

    try{

        const currentUser = await getCurrentuser();

        if(!currentUser?.id){
            return [];
        }

        const conversations = await prismadb.conversation.findMany({
            orderBy:{
                lastMessageAt: 'desc',
            },
            where:{
                userIds:{
                    has:currentUser.id
                }
            },
            include:{
                users:true,
                messages:{
                    include:{
                        sender:true,
                        seen:true,
                    }

                }
            }
        });

        return conversations;

    }

    catch(error:any){
        return [];
    }

   




}

export default getConversations;