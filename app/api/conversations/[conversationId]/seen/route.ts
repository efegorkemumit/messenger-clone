import getCurrentuser from '@/app/hook/getCurrentUser'
import prismadb from '@/app/libs/prismadb'
import { pusherServer } from '@/app/libs/pusher';
import { NextResponse } from 'next/server';


interface IParams{
    conversationId:string
}

export async function POST(request:Request, {params}:{params: IParams}) {

    try{
        const currentUser = await getCurrentuser();
        const {
            conversationId
        } = params;

        if(!currentUser?.id || !currentUser?.email){
            return NextResponse("Unauthorized",{status:401});
        }

        const conversation = await prismadb.conversation.findUnique({
            where:{
                id:conversationId,
            },
            include:{
                messages:{
                    include:{
                        seen:true,
                    }
                },
                users:true,
            }
        });

        if(!conversation){
            return NextResponse("Invalid Id",{status:400});

        }

        const lastMessage = conversation.messages[conversation.messages.length-1];

        if(!lastMessage){
            return NextResponse.json(conversation);

        }

        const updatedMesage = await prismadb.message.update({
            where:{
                id:lastMessage.id
            },
            include:{
                sender:true,
                seen:true,
            },
            data:{
                seen:{
                    connect:{
                        id:currentUser.id
                    }
                }
            }
        })

        await pusherServer.trigger(currentUser.email, 'conversation:update',{
            id:conversationId,
            messages:[updatedMesage]
        });

        if(lastMessage.seenIds.indexOf(currentUser.id)!==-1){
            return NextResponse.json(conversation);
        }

        await pusherServer.trigger(conversationId!, 'message:update', updatedMesage);

        return new NextResponse('success');
    }

    catch(error){
        return new NextResponse('Error', {status:500});
    }
    
    
}