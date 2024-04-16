import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function POST(req:Request) {
  const body=await req.json();
  const {chapterId,
    title ,
   
    content }=body;

    const user =await getCurrentUser();
  if (!user){
    return NextResponse.json({status:false, message:"unauthorized"});
  }

  if (user.role!=="ADMIN"){
    return NextResponse.json({status:false, message:"unauthorized"});

  }

    if(!chapterId || !content || !title ) {
      return NextResponse.json({
        status: false,
        message:"Invalid  parameters"
      });
     }

     const newLesson= await prisma.lesson.create({
      data:{
        chapterId:chapterId, 
        title:title,
         }
     })
     return NextResponse.json(newLesson);
  
}