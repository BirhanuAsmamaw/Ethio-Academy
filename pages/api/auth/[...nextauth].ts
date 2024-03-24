import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/lib/prismadb"
import bcrypt from 'bcrypt'
import { getUserById } from "@/actions/tokens/getUserbyd"
import { generateVerificationToken } from "@/actions/tokens/generateToken"
import { sendVerificationEmail } from "@/lib/mail"
import { NextResponse } from "next/server"

export const authOptions:AuthOptions={
  adapter: PrismaAdapter(prisma),
  providers: [

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
CredentialsProvider({
  name:"credentials",
  credentials:{
    email:{
      label:"email",
      type:"text"
    },
    password:{
      label:"password",
      type:"password"
    }
  },
  async authorize(credentials){
    if(!credentials?.email || !credentials?.password) {
      throw new Error("invalid email or password")
    }
    const user=await prisma.user.findUnique({
      where:{
        email:credentials.email
      }
    });

  

 


    if (!user || !user.hash){
      throw new Error("invalid email or password")
    }
    const isMatch=await bcrypt.compare(credentials.password,user.hash)

    if(!isMatch){
      throw new Error("invalid email or password")
    }


    
    if(user&&!user.emailVerified){
  
      const verificationToken=await generateVerificationToken(credentials.email)

      const confirmLink=`https://ethio-exams-academy.vercel.app/account-verification?token=${verificationToken.token}`
    
    
     await sendVerificationEmail(verificationToken.email,confirmLink)
    
    
      
    }
     
        return user;
    
     
   
  }
})

  ],

  
  pages:{
    signIn:'/'
  },
  events:{
    async linkAccount ({user}) {
      await prisma.user.update({
        where: {id: user.id},
        data: {emailVerified:new Date()}
      })
    }
  },
  callbacks:{
    
    async signIn({user,account}){
      const existingUser = await getUserById(user.id as string)
      if(account?.provider==="credentials"){
        if(!existingUser?.emailVerified){
          return false
        }
      }
      return true;
    },
  },

  debug:process.env.NODE_ENV==="development",
  session:{
    strategy:"jwt"
  },
  secret:process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)