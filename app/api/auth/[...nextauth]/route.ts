import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import prismadb from '@/app/libs/prismadb'
import {compare} from 'bcrypt'
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions : AuthOptions = {
    adapter:PrismaAdapter(prismadb),
    providers:[
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
          }),
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
          }),
          Credentials({
            name: 'credentials',
            credentials :{
                email: {label:'email', type:'text'},
                password: {label:'password', type:'password'}
            },
            async authorize(credentials){

                if(!credentials?.email || !credentials?.password){
                    throw new Error("Invalid credentials");
                    
                }

                const user = await prismadb.user.findUnique({
                    where :{
                        email : credentials.email
                    }

                });

                if(!user || !user?.hashedPassword){
                    throw new Error("Invalid credentials");
                }

                const isCorrectPasswrod = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                if(!isCorrectPasswrod)
                {
                    throw new Error("Invalid credentials");
                }
                return user;

            }


          })
          
        ], 

    debug:process.env.NODE_ENV ==='development',
    session:{
        strategy:'jwt'
    },
    secret:process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
          