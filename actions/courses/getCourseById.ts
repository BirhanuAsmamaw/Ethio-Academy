import prisma from '@/lib/prismadb'
import { getCurrentUser } from '../users/currentUser';

export async function GetCourseById(courseId: string){
  try{

    const user=await getCurrentUser()
    const course = await prisma.course.findUnique({
      where:{
       
        id:courseId,
      },
      include:{
        
        
        subject:{
          include:{
department:true
          }
        },
        instructor:{
          include:{
            subscribers:true,
            user:true
          }
        },
        chapters:{
        include:{
          lessons:{
            include:{
              questions:true
            }
          }
        }
      },
        reviews:{
          orderBy:{
            createdAt:"desc"
          },
          include:{
            customer:true
          }
      }},
      
    });
    const isSubscribe=course?.instructor?.subscribers.some((usr)=>usr.userId===user?.id)
    return {...course,isSubscribe:isSubscribe}
    
  }
  
  catch(e){
    return null;
  }
}