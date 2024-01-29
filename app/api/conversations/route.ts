import getCurrentuser from '@/app/hook/getCurrentUser'
import prismadb from '@/app/libs/prismadb'
import { pusherServer } from '@/app/libs/pusher'
import { NextResponse } from 'next/server';


export async function POST(request:Request) {

    try{
        
        const currentUser = await getCurrentuser();
        const body = await request.json();
        const {
            userId,
            isGroup,
            members,
            name
        }= body;

        if(!currentUser?.id || !currentUser.email){
            return new NextResponse("Unauthorized", {status:400});
        }

        if(isGroup && (!members || members.length < 2 || !name )){
            return new NextResponse("Invalid Data", {status:400});
        }

        if (isGroup) {
            const newConversation = await prismadb.conversation.create({
                data: {
                    name,
                    isGroup,
                    users: {
                        connect: [
                            ...members.map((member: { value: string }) => ({ id: member.value })),
                            { id: currentUser.id }
                        ]
                    }
                }
            });

            newConversation.users.forEach((user)=>{

                if(user.email){
                    pusherServer.trigger(user.email, 'conversation:new', newConversation)
                }
            })



        }


        const existingConversations = await prismadb.conversation.findMany({
            where:{
                OR:[
                    {
                        userIds:{
                            equals:[currentUser.id, userId]
                        }
                    },
                    {
                        userIds:{
                            equals:[userId, currentUser.id]
                        }
                    }
                ]
            }

        });

        const singleconversation = existingConversations[0];

        if(singleconversation){
            return NextResponse.json(singleconversation);
        }


        const newConversation = await prismadb.conversation.create({
            data:{
                users:{
                    connect:[
                        {
                            id:currentUser.id
                        },
                        {
                            id:userId
                        }
                    ]
                }
            },
            include:{
                users:true
            }


        });


        newConversation.users.map((user)=>{
            if(user.email){
                pusherServer.trigger(user.email, 'conversation:new', newConversation);
            }
        })

        return NextResponse.json(newConversation)

    }
    catch(error){
        return new NextResponse("Invalid Error", {status:500});

    }
    
}
