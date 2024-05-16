import prisma from "@/lib/prismadb"
import { getCurrentUser } from "../users/currentUser";
export async function getTeacherById(id: string){
try{
  const user=await getCurrentUser();
  
  const teacher=await prisma.teacher.findUnique({
    where:{id:id},
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

  return {...teacher,
    is_subscriber:isSubscribe,
    learner_no:learners,
    subscribe_no:teacher?.subscribers.length,
    course_no:teacher?.courses.length};
}
catch(e){
  return null;
}
}