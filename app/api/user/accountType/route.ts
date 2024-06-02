
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function PUT(req: Request){
  
  const body = await req.json();
  const {account} = body;

  try{
    const user=await  getCurrentUser();
   
    if(!user){
      return NextResponse.json({message:"Unauthorized"},{status:400})
    }
    

    const updatedProfileAccount=await prisma.user.update({
      where: {id:user.id},
      data:{
        accountType:account

      }
    })
    return NextResponse.json(updatedProfileAccount);
  }
  catch(err){
    return NextResponse.json({message:"Something went wrong"},{status:500})
   
  }
}