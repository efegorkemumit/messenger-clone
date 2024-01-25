import getCurrentuser from '@/app/hook/getCurrentUser'
import prismadb from '@/app/libs/prismadb'
import { pusherServer } from '@/app/libs/pusher'
import { NextResponse } from 'next/server';


interface IParams{
    conversationId?:string;
}

export async function DELETE(request:Request,{ params} :{params:IParams})
{

    try{
        const {conversationId} = params;
        const currentUser = await getCurrentuser();

        if(!currentUser?.id){
            return NextResponse.json(null);
        }

        const existingConversations = await prismadb.conversation.findUnique({
            where:{
                id:conversationId
            },
            include:{
                users:true
            }
        });

        if(!existingConversations){
            return new NextResponse('Invalid Id', {status:400})
        }
        
        const deletedConversation = await prismadb.conversation.deleteMany({
            where:{
                id:conversationId,
                userIds:{
                    hasSome:[currentUser.id]
                }
            }
        });

        existingConversations.users.forEach((user)=>{
            if(user.email){
                pusherServer.trigger(user.email, 'conversation:remove', existingConversations);

            }
        })

        return NextResponse.json(deletedConversation)


    }
    catch(error){
        return new NextResponse.json(null);

    }
    
}