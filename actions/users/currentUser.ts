import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from '@/lib/prismadb'


export async function getSession() {
  return await getServerSession(authOptions)
  
}
export async function getCurrentUser() {
 try{
  const session=await getSession();
  if(!session?.user?.email){
    return null
  }
  const currentUser=await prisma.user.findUnique({
    where:{email:session.user.email},
    include:{
      courseStreaks:{
        include:{
          course:true
        }
      },
      teacher:{
        include:{
          subscribers:true,
          courses:{
            include:{
              payments:true
            }
          }
        }
      },
      roles:{
        include:{
          role:true
        }
      },
      permissions:{
        include:{
          permission:true
        },
        
      },
     
      
     payedCourses:{
      include:{
        
        
        courses:{
          include:{
           
            course:true
          }
        },
        department:{
          include:{
            exam:true
          }
        }
      }
     }
    }
  })
  if(!currentUser){
    return null;
  }


  const learners = currentUser?.teacher?.courses.reduce((total, course) => total + course.payments.length, 0);

  const instructor = currentUser?.teacher ? {
    ...currentUser.teacher,
    learner_no: learners,
    subscribe_no: currentUser.teacher.subscribers.length,
    course_no: currentUser.teacher.courses.length
  } : null;



  return{...currentUser,
    username:currentUser.username!==currentUser.email?currentUser.username:null,
    teacher:instructor,
    createdAt:currentUser.createdAt.toISOString()
    ,updatedAt:currentUser.updatedAt.toISOString(),
    emailVerified:currentUser.emailVerified?.toISOString()||null
  }
 }

 catch(error:any){
  return null
 }
  
}
