import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function POST(req:Request) {
  const body=await req.json();
  const {lessonId,
    content ,
   image
     }=body;
     const user =await getCurrentUser();
     if (!user){
       return NextResponse.json({status:false, message:"unauthorized"});
     }
   
     if (user.role!=="ADMIN"){
       return NextResponse.json({status:false, message:"unauthorized"});
   
     }
    if(!lessonId ) {
      return NextResponse.json({
        status: false,
        message:"Invalid  parameters"
      });
     }

     const newContent= await prisma.content.create({
      data:{
        lessonId:lessonId, 
        content:content,
        image:image
         }
     })
     return NextResponse.json(newContent);
  
}