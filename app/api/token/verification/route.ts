import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getVerificationTokenByToken } from "@/actions/tokens/getVerificationByToken";
import { getUserByEmail } from "@/actions/users/getuserByEmail";
export async function POST(req:Request) {
  const body=await req.json();
  const {token} = body
  try{
    if(!token){
      return NextResponse.json({error:"token not found"});
    }
    const existingToken = await getVerificationTokenByToken(token);
   
    
    if(!existingToken){
      return NextResponse.json({error: `Verification token does not exist  ${existingToken}`})
    }

    const isExpiredToken = new Date(existingToken.expires) < new Date()

    if(isExpiredToken){
      return NextResponse.json({error: "Verification token expired"})
    }
    const existingUser = await getUserByEmail(existingToken.email)
    if(!existingUser){
      return NextResponse.json({error: "Email does not exist"})
    }

    // updated email verified
   await prisma.user.update({
    where:{id:existingUser.id},
    data:{
      emailVerified:new Date(),
      email:existingUser.email
    }

   });

   await prisma.verificationToken.delete({where:{id:existingToken.id}})
   return NextResponse.json({succes:"Email verified successfully"})
  }
  catch(err:any){
    return NextResponse.json({error:"something went wrong"})
  }
  
}
