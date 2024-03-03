import prisma from '@/lib/prismadb'
import { getCurrentUser } from '../users/currentUser';

export async function DeleteCourseById(courseId: string){
  try{



    const user=await  getCurrentUser();

    if(!user){
      return  {
        status: false,
        message:"unathorized",
      };;
    }
    if(user.role!=="ADMIN"){
      return  {
        status: false,
        message:"unathorized",
      };
    }

    const course=await prisma.course.findUnique({
      where: {id:courseId}
    })
    if(!course){
      return  {
        status: false,
        message:"Course not found",
      };
    }
    


    await prisma.course.delete({
      where: {id:courseId},
      
    })


    return {
      status: true,
      message:"Course deleted successfully"
    }
    
  }
  
  catch(e){
    return null;
  }
}