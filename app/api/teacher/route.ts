import { getCurrentUser } from "@/actions/users/currentUser";
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server";
export async function POST(req: Request, res: Response){
const body=await req.json();
try{
  const { accountName ,
    bankAccount ,
    
    title,
    description}=body;
  const user=await getCurrentUser();
  if(!user){
    throw new Error("access denied");
  }


    const newTeacher=await prisma.teacher.create({
      data:{
        userId:user.id,
        accountName:accountName,
        bankAccount:bankAccount,
        title:title,
       
        description:description

      }
    })
  
    return NextResponse.json(newTeacher);
}
catch(err){
  throw new Error("Something went wrong")
}
}