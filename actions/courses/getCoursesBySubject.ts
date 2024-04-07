import prisma from "@/lib/prismadb";

export async function getCoursesBySubject(department: string) {
  try {
    const ccourses = await prisma.course.findMany({
      where:{
        subject:{
          department:{
            url:department
          }
        }
      },
      include:{
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
