
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function GET(req: NextRequest){
  
    const searchParams = req.nextUrl.searchParams;
    const courseId = searchParams.get("courseId");
  
    try {

      if(!courseId){
        return NextResponse.json({ message: "Invalid params" }, { status: 400 }); 
      }
      const user = await getCurrentUser();
      if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 404 });
      }
  
      // Check if the course exists
      const course = await prisma.course.findUnique({ where: { id: courseId } });
  
      if (!course) {
        return NextResponse.json({ message: "Course does not exist" }, { status: 404 });
      }

      const payedCourses=await prisma.payment.findMany({
        where:{
          customerId:user?.id
        }
      });

      if(!payedCourses){
        return NextResponse.json({message:"Payed Course not found!"},{status:404})
      }
  
      const CoursesPayed = payedCourses
      .filter((ps:any) => ps.status)
      .flatMap((payedCourse:any) => 
        payedCourse.courses.map((course:any) => {
          
          return course.course;
        })
      );
    
    const isCoursePayed = CoursesPayed?.some((c:any) => c.id === course.id)||course?.price==0;

   
    return NextResponse.json({isCoursePayed:isCoursePayed,isUser:user?true:false},{status:200});
  }
  catch(err:any){
    return NextResponse.json({ message: err }, { status: 500 });
  }
}