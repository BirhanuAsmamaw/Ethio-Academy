import prisma from "@/lib/prismadb"
import { NextRequest, NextResponse } from "next/server";
export async function GET(req:NextRequest) {
  const searchParams = req.nextUrl.searchParams;
    const status = searchParams.get("status");
  try {
    const allTeachers = await prisma.teacher.findMany({
      where: status !== null ? { status: Boolean(status) } : {},
      
      include: {
        
        subscribers: {
          include: {
            user: true,
          },
        },
        courses: {
          include: {
            payments: true,
          },
        },
        user: true,
      },
    });

    // Calculate the number of learners by summing up payments for each course
    const instructors = allTeachers.map((instructor) => {
      const learners = instructor.courses.reduce((total, course) => total + course.payments.length, 0);
      return {
        ...instructor,
        learner_no: learners,
        subscribe_no: instructor.subscribers.length,
        course_no: instructor.courses.length,
      };
    });

    return NextResponse.json(instructors,{status:200});
  } catch (e) {
    
    return NextResponse.json({message:"something went wrong"},{status:500});
  }
}