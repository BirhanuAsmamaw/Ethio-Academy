import { generateVerificationToken } from "@/actions/tokens/generateToken";
import { getUserByEmail } from "@/actions/users/getuserByEmail";
import { sendVerificationEmail } from "@/lib/mail";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response){
  const body=await req.json();

  const{email}=body;
  try{
    if(!email){
      return NextResponse.json({message:'email is not empty'},{status:400});
     

    }
  
    const user=await getUserByEmail(email)
    if(!user){
      return NextResponse.json({message:'email is not existing'},{status:400});
     
    }
    const verificationToken=await generateVerificationToken(email)

    const confirmLink=`https://ethio-exams-academy.vercel.app/resetPassword?token=${verificationToken.token}`
  
  
   await sendVerificationEmail(verificationToken.email,confirmLink,user?.name||"")
     
  return NextResponse.json({succes:"confirmation email sent successfully"});
   
  }
  catch(e){
    return NextResponse.json({message:'something went wrong'},{status:500});
  }
}