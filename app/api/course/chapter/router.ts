import { NextResponse } from "next/server";
import prisma from '@/lib/prismadb'
export async function POST(req:Request){
 const body=await req.json();
 const {title,courseId}=body;
 if(!title){
  return NextResponse.json({
    status:false,
    message:"title and courseId is not empty",
  });
 }


 const newChapter=await prisma.chapter.create({
  data:{
    courseId:courseId,
    title:title,
  }
 });

 return NextResponse.json(newChapter);


}