import prisma from "@/lib/prismadb";

export async function getNewCoursesByDepartment(department: string) {
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
        instructor:{
          include:{
            user:true
          }
                  },
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
