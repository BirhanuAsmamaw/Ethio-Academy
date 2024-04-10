import prisma from '@/lib/prismadb'

export async function GetCourseById(courseId: string){
  try{
    const course = await prisma.course.findUnique({
      where:{
       
        id:courseId,
      },
      include:{
        subject:{
          include:{
department:true
          }
        },
        chapters:{
        include:{
          lessons:{
            include:{
              questions:true
            }
          }
        }
      },
        reviews:{
          orderBy:{
            createdAt:"desc"
          },
          include:{
            customer:true
          }
      }},
      
    });
    return course
    
  }
  
  catch(e){
    return null;
  }
}