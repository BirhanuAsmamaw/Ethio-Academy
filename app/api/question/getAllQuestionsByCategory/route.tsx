import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function GET(req:Request,res:Response) {
  const { type, department, year, subject, isModel } =await req.json();
  try {
    const whereClause: any = {
      year: year,
      isModel:isModel,
      department: {
        departmentName: department,
        exam: {
          url: type,
        },
      },
      
    };

    if (subject) {
      whereClause.subject = subject;
      
    }

    const selectedQuestion = await prisma.question.findMany({
      where: whereClause,
    });

    return NextResponse.json(selectedQuestion);
  } catch (err) {
    // Handle the error appropriately
    console.error("Error in getQuestionsByCategory:", err);
    throw err; // Re-throw the error to be caught by the calling function or handle it accordingly.
  }
}
