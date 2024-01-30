import getCurrentuser from '@/app/hook/getCurrentUser'
import prismadb from '@/app/libs/prismadb'
import { NextResponse } from 'next/server';

export async function POST(request:Request) {
    
    try{

        const currentUser= await getCurrentuser();
        const body = await request.json();

        const {name, image} = body;

        if(!currentUser?.id || !currentUser?.email){
            return new NextResponse("Unautorized", {status: 401})
        }

        const updateUser = await prismadb.user.update({
            where:{
                id:currentUser.id
            },
            data:{

                image:image,
                name:name
            }


        })

        return NextResponse.json(updateUser)
    }catch(error){
        return new NextResponse('error', {status:500});
    }
    
}