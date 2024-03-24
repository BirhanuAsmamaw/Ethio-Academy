import { generateVerificationToken } from "@/actions/tokens/generateToken";
import { sendVerificationEmail } from "@/lib/mail";
import prisma from "@/lib/prismadb"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"


export async function POST(req:Request) {
  console.log("user created");
  const body=await req.json()

  const {name,email,password,repeatpassword}=body
  if(!email || !password || !repeatpassword ||!name){
    throw new Error('invalid params');
  }

  if (password!==repeatpassword){
    throw new Error('password does not match');
  }

  const user = await prisma.user.findUnique({where: {email: email}})

  if (user) {
    if(!user.emailVerified){

      const verificationToken=await generateVerificationToken(email)

      const confirmLink=`https://ethio-exams-academy.vercel.app/account-verification?token=${verificationToken.token}`
    
    
     await sendVerificationEmail(verificationToken.email,confirmLink)
    
      
      return NextResponse.json({succes:"confirmation email sent successfully"})
    }
    else{
      throw new Error('User already exists');
    }
   
  }
  else{
    const hashPassword=await bcrypt.hash(password,10)

  
    await prisma.user.create({
      data:{name:name,email:email,hash:hashPassword}
    });
  


  const verificationToken=await generateVerificationToken(email)

  const confirmLink=`https://ethio-exams-academy.vercel.app/account-verification?token=${verificationToken.token}`


 await sendVerificationEmail(verificationToken.email,confirmLink)

  
  return NextResponse.json({succes:"confirmation email sent successfully"});
  }

  
  
}