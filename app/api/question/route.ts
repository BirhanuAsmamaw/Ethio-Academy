import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
export async function POST(req:Request) {
  const body=await req.json();
  const {questions} =body;

    if(!questions.length) {
      return NextResponse.json({
        status: false,
        message:"Invalid  parameters"
      });
     }

     const newQuestions= await prisma.question.createMany({
      data:questions
     })
     return NextResponse.json(newQuestions);
  
}