import { getCurrentUser } from "@/actions/users/currentUser";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prismadb"

export async function PUT(req: Request, res: Response){
  const body =await req.json();

  try{
    const{oldPassword,newPassword}=body;


    if (!oldPassword || !newPassword){
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

    //compare password
    if (!user || !user.hash){
      return  NextResponse.json({
        status: false,
        message:"invalid password"
      })
     
    }
    const isMatch=await bcrypt.compare(oldPassword,user.hash)

    if(!isMatch){
      return  NextResponse.json({
        status: false,
        message:"invalid password"
      })
    }

    // hash new password
    const hashPassword=await bcrypt.hash(newPassword,10)

   // update password
    const updatedPassword=await prisma.user.update({
      where: {id:user.id},
      data:{
        hash:hashPassword
      }
    })
   return NextResponse.json(updatedPassword)
  }
  catch(err){};
}