import getCurrentuser from '@/app/hook/getCurrentUser'
import prismadb from '@/app/libs/prismadb'
import { pusherServer } from '@/app/libs/pusher';
import { NextResponse } from 'next/server';


export async function POST(request:Request) {

    try{

        const currentUser= await getCurrentuser();

        const body = await request.json();

        const { message, image, conversationId} = body;

        if(!currentUser?.id || !currentUser?.email){
            return new NextResponse("Unautorized", {status: 401})
        }

        const newMessage = await prismadb.message.create({
            include:{
                seen: true,
                sender: true,
            },
            data:{
                body:message,
                image: image,
                conversation : {
                    connect :{ id:conversationId}
                },
                sender:{
                    connect :{ id:currentUser.id}
                },
                seen:{
                    connect:{id:currentUser.id}
                }
            }
        });

        const UpdateConversation = await prismadb.conversation.update({
            where: {
                id:conversationId
            },
            data: {
                lastMessageAt : new Date(),
                messages:{
                    connect:{
                        id:newMessage.id
                    }
                }


            },
            include:{
                users:true,
                messages:{
                    include:{
                        seen:true
                    }
                }
            }
        });


        await pusherServer.trigger(conversationId, 'messages:new', newMessage);

        const lastMessage = UpdateConversation.messages[UpdateConversation.messages.length -1];


        UpdateConversation.users.map((user)=>{
            pusherServer.trigger(user.email!, 'conversations:update',{
                id:conversationId,
                message:  [lastMessage]
            })
        })

        return NextResponse.json(newMessage)



    }catch(error){
        console.log(error)
        return new NextResponse("Error", {status: 401})

    }
    
}