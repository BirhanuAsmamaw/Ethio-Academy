
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";

export async function PUT(req: Request,res:Response){
  
  const body = await req.json();
  const {  logo
      } = body;

  try{
    const user = await getCurrentUser();
    if(!user){
      throw new Error("Unathorized")
    }

    
   
    if(!user.teacher){
   throw new Error("teacher not found");
    }



    const updatedteacher=await prisma.teacher.update({
      where: {id:user.teacher.id},
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