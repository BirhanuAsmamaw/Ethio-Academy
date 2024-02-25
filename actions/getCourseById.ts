import prisma from '@/lib/prismadb'

export async function GetCourseById(courseId: string){
  try{
    const course = await prisma.course.findUnique({
      where: {id: courseId}
    })

    return course
  }
  
  catch(e){
    return null;
  }
}