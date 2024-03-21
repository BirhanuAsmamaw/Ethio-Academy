import prisma from "@/lib/prismadb"
import { NextResponse } from 'next/server';
import bcrypt from "bcrypt"
export async function POST(req:Request, res:Response){
  const body=await req.json();
  const {token,retypePassword,password}=body;


  try{
if(!token || !retypePassword || !password){
  throw new Error('invalid parameters');
}

if(password!==retypePassword){
  throw new Error('password not match');
}
const verificationToken=await prisma.verificationToken.findUnique({
  where:{token:token}
})

if(!verificationToken){
  throw new Error('invalid token');
}


const isExpiredToken = new Date(verificationToken.expires) < new Date()

    if(isExpiredToken){
      return NextResponse.json({error: "Verification token expired"})
    }
    
const hashedPassword=await bcrypt.hash(password,10);

await prisma.user.update({
  where:{email:verificationToken.email},
  data:{
    hash:hashedPassword,
    email:verificationToken.email
  }
})
return NextResponse.json({
  message:"Password updated successfully"
});
    
  }
  catch(err){
    throw new Error('something went wrong');
  }
}

