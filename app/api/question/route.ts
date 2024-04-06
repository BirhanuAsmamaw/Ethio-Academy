import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
export async function POST(req:Request) {
  const body=await req.json();
  const {
    departmentId,
    subject,
    lessonId,
    title ,
    title_two,
    isModel,
    chooses ,
    universityId,
    year,
    explanation
  } =body;
  try{

    if( !title || !chooses.length || !year || !explanation) {
      return NextResponse.json({
        status: false,
        message:"Invalid  parameters"
      });
     }

     const newQuestions= await prisma.question.create({
       data:{
        subject:subject,
        departmentId: departmentId,
        universityId:universityId,
        lessonId:lessonId,
        title:title,
        chooses:chooses,
        year:year,
        title_two:title_two,
        isModel:isModel,
        explanation:explanation
       }
     })
     return NextResponse.json(newQuestions);
    }
    catch(err) {
      console.log(err);
    }
}