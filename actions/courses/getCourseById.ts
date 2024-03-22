import prisma from '@/lib/prismadb'

export async function GetCourseById(courseId: string){
  try{
    const course = await prisma.course.findUnique({
      where:{id: courseId},
     
      include:{
        reviews:true,
        chapters:{
          include: {
            lessons:true
          }
        }
      }
      
    });
  return course
  }catch(e){
    return null;
  }
}