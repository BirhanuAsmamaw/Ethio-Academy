import { getCurrentUser } from "@/actions/users/currentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"

export async function PUT(req: Request, res: Response){
  const body =await req.json();

  try{
    const{name,email}=body;


    if (!name || !email){
      return  NextResponse.json({
        status: false,
        message:"invalid parameters"
      })

    }
    const user= await getCurrentUser();
    if(!user){
     return  NextResponse.json({
        status: false,
        message:"unathorized"
      })
    }


    

    // update profile
    const updatedprofile=await prisma.user.update({
      where: {id:user.id},
      data:{
        name:name,
        email:email,
        
      }
    })
   return NextResponse.json(updatedprofile)
  }
  catch(err){};
}