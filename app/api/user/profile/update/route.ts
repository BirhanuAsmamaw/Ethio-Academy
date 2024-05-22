
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function PUT(req: Request){
  
  const body = await req.json();
  const {department,name,description} = body;

  try{
    const user=await  getCurrentUser();
   
    if(!user){
      return NextResponse.json({message:"Unauthorized"},{status:400})
    }
    

    const updatedProfile=await prisma.user.update({
      where: {id:user.id},
      data:{
        department:department||user.department,
        name:name||user.name,
        description:description||user.description

      }
    })
    return NextResponse.json(updatedProfile);
  }
  catch(err){
    return NextResponse.json({message:"Something went wrong"},{status:500})
   
  }
}