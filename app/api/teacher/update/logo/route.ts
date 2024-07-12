
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
import { myTeacherAccount } from "@/actions/teacher/myAccount";

export async function PUT(req: Request,res:Response){
  
  const body = await req.json();
  const {  logo
      } = body;

  try{
    const myAccount:any=await myTeacherAccount()
 // authorization
 const user = await getCurrentUser();
 if(!user){
   return NextResponse.json({message:"Unauthorized"},{status:400})
   
 }

    
   
    if(!myAccount){
   throw new Error("teacher not found");
    }



    const updatedteacher=await prisma.teacher.update({
      where: {id:myAccount?.id},
      data:{
       logo:logo
      }
 
    })
    return NextResponse.json(updatedteacher);
  }


  catch(err){
    throw new Error("Something went wrong")
  }
}