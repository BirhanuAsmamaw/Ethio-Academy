import prisma from "@/lib/prismadb";

export async function getNewCoursesBySubject(department: string,subject: string){
  try {
    const ccourses = await prisma.course.findMany({
      where:{
        subject:{
          id:subject,
          department:{
            url:department
          }
        }
      },
      include:{
        reviews:true,
        subject:{
          include:{
            department:true
          }
        },
      }
    });

   
    return ccourses;
  } catch (e) {
    console.error('Error:', e);
    return null;
  }
}
