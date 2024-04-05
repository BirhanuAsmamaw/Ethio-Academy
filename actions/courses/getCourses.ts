import prisma from "@/lib/prismadb"

export async function getCourses(){
  try{
    const courses = await prisma.course.findMany({
      orderBy:{
rating:"desc"
      },
      include:{
        reviews:true,
        chapters:{
          include: {
            lessons:true
          }
        }
      },
      skip: (2- 1) * 4,
      take: 4,
      
    });
  return courses
  }catch(e){
    return null;
  }
  
}