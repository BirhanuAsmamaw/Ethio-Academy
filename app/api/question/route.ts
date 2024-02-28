import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
export async function POST(req:Request) {
  const body=await req.json();
  const {title,
    lessonId,
    chooses,
    year} =body;

    if(!lessonId|| !chooses.length ||  !title || !year) {
      return NextResponse.json({
        status: false,
        message:"Invalid  parameters"
      });
     }

     const newQuestions= await prisma.question.create({
      data:{
        lessonId:lessonId, 
        title:title,
         chooses:chooses,
       year:year, 
         }
     })
     return NextResponse.json(newQuestions);
  
}