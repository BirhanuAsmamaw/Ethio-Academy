
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function GET(req: NextRequest){
  
    const searchParams = req.nextUrl.searchParams;
    const teacherId = searchParams.get("teacherId");
  
    try{
      const user=await getCurrentUser();

      if(!teacherId){
        return NextResponse.json({message:"invalid Params"},{status:400})
      }
      
      const teacher=await prisma.teacher.findUnique({
        where:{id:teacherId},
        include:{
          subscribers:{
            include:{
              user:true
            }
          },
         courses:{
          include:{
            payments:true
          }
         },
          user:true,
          
        }
      })
    
        // Calculate the number of learners by summing up subscribers for each course
        const learners = teacher?.courses.reduce((total, course) => total + course.payments.length, 0);
        const isSubscribe=teacher?.subscribers.some((usr)=>usr.userId===user?.id)
    
     const teacherData= {...teacher,
        isUser:user?true:false,
        is_subscriber:isSubscribe,
        learner_no:learners,
        subscribe_no:teacher?.subscribers.length,
        course_no:teacher?.courses.length};

        return NextResponse.json(teacherData,{status:200})
    }
    
  catch(err:any){
    return NextResponse.json({ message: err }, { status: 500 });
  }
}