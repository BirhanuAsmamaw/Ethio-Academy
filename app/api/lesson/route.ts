import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
export async function POST(req:Request) {
  const body=await req.json();
  const {chapterId,
    title ,
    videoUrl,
    videoThumbnail,
    content }=body;

    if(!chapterId || !videoThumbnail || !content || !title || !videoUrl) {
      return NextResponse.json({
        status: false,
        message:"Invalid  parameters"
      });
     }

     const newLesson= await prisma.lesson.create({
      data:{
        chapterId:chapterId, 
        title:title,
         videoUrl:videoUrl, 
         videoThumbnail:videoThumbnail, 
         content:content}
     })
     return NextResponse.json(newLesson);
  
}