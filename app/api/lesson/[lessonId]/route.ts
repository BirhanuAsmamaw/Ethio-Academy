import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { lessonId: string } }){

  const lessonId=params.lessonId;


  const lesson=await prisma.lesson.findUnique({
    where:{ id: lessonId},
    include:{ 
      questions: true,
      chapter:{
        include:{
          course:true
        }
      }
    }

  })

  return NextResponse.json(lesson);

}