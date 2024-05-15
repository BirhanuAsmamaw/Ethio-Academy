import prisma from "@/lib/prismadb"
import { subscribe } from "diagnostics_channel";
export async function getTeacherById(id: string){
try{
  const teacher=await prisma.teacher.findUnique({
    where:{id:id},
    include:{
      subscribers:true,
      courses:{
        
        include:{
          payments:{
            include:{
              payment:{
              select:{
                status:true
              }
              }
            }
            
          },
          reviews:true,
          subject:{
            include:{
              department:true,
            }
          },
          
        }
      },
      user:true,
    }
  })

    // Calculate the number of learners by summing up subscribers for each course
    const learners = teacher?.courses.reduce((total, course) => total + course.payments.length, 0);

  return {...teacher,
    learner_no:learners,
    subscribe_no:teacher?.subscribers.length,
    course_no:teacher?.courses.length};
}
catch(e){
  return null;
}
}