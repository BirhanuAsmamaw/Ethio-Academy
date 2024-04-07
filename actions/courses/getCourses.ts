import prisma from "@/lib/prismadb"

export async function getCourses(page: number){
  try{
    const courses = await prisma.course.findMany({
      orderBy:{
rating:"desc"
      },
      include:{
        reviews:true,
        subject:{
          include:{
            department:true
          }
        },
        chapters:{
          include: {
            lessons:true,
            
          },
          
        }
      },
      skip: (page- 1) * 4,
      take: 4,
      
    });
    const count = await prisma.course.count(); // Count of app instances

    return { courses, count }; 
 
  }catch(e){
    return null;
  }
  
}