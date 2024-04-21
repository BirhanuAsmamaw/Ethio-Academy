import prisma from "@/lib/prismadb";

export async function getCoursesBySubject(department: string,subject: string){
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
      orderBy:{
        rating:"desc"
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
