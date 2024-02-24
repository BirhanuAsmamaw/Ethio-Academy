import prisma from "@/lib/prismadb"

export async function getCourses(){
  try{
    const courses = await prisma.course.findMany({
      include:{
        reviews:true,
        chapters:{
          include: {
            lessons:true
          }
        }
      }
      
    });
  return courses
  }catch(e){
    return null;
  }
  
}