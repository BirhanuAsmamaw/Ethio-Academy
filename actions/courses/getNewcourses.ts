import prisma from "@/lib/prismadb"

export async function getNewCourses(page:number,pageSize:number){
  try{
    const courses = await prisma.course.findMany({
     
      include:{
        reviews:true,
        chapters:{
          include: {
            lessons:true
          }
        }
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      
    });
  return courses
  }catch(e){
    return null;
  }
  
}