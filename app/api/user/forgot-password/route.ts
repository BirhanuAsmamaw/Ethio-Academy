import { generateVerificationToken } from "@/actions/tokens/generateToken";
import { sendVerificationEmail } from "@/lib/mail";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response){
  const body=await req.json();

  const{email}=body;
  try{
    if(!email){
      throw new Error('email is not empty');

    }
  
    const verificationToken=await generateVerificationToken(email)

    const confirmLink=`https://ethio-exams-academy.vercel.app/resetPassword?token=${verificationToken.token}`
  
  
   await sendVerificationEmail(verificationToken.email,confirmLink)
     
  return NextResponse.json({succes:"confirmation email sent successfully"});
   
  }
  catch(e){
    throw new Error('something went wrong');
  }
}