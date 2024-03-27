import { getCurrentUser } from "@/actions/users/currentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"

export async function PUT(req: Request, res: Response){
  const body =await req.json();

  try{
    const{image,image_key}=body;


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
        image_key:image_key,
        image:image
      }
    })
   return NextResponse.json(updatedprofile)
  }
  catch(err){};
}