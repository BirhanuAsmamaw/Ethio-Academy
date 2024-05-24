import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
export async function POST(req:Request) {
  const body=await req.json();
  const {
    departmentId,
    subjectId,
    lessonId,
    title ,
    title_two,
    code,
    isModel,
    chooses ,
    universityId,
    year,
    explanation
  } =body;
  try{

    if( !title || !chooses.length || !explanation) {
      return NextResponse.json({
        status: false,
        message:"Invalid  parameters"
      });
     }

     const newQuestions= await prisma.question.create({
       data:{
        subjectId:subjectId,
        code:code,
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
     
    }
}