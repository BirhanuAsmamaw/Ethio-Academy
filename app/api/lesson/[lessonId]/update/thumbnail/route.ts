
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function PUT(req: Request, {params}:{params:{lessonId:string}}){
  const lessonId=params.lessonId;
  const body = await req.json();
  const {thumbnail} = body;

  try{
    const user=await  getCurrentUser();

    if(!user){
      return NextResponse.json({status:false, message:"unathorized"});
    }
    if(user.role!=="ADMIN"){
      return NextResponse.json({status:false, message:"unathorized"});
    }

    const lesson=await prisma.lesson.findUnique({
      where: {id:lessonId}
    })
    if(!lesson){
      return NextResponse.json({status:false, message:"lesson not found"});
    }

    const updatedLesson=await prisma.lesson.update({
      where: {id:lessonId},
      data:{
      videoThumbnail:thumbnail
      }
    })
    return NextResponse.json(updatedLesson);
  }
  catch(err){}
}