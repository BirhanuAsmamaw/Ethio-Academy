import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
export async function POST(req:Request) {
  const body=await req.json();
  const {
    lessonId,
    title ,
    chooses ,
    year,
    explanation
  } =body;
  try{

    if(!lessonId || !title || !chooses.length || !year || !explanation) {
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
        explanation:explanation
       }
     })
     return NextResponse.json(newQuestions);
    }
    catch(err) {
      console.log(err);
    }
}