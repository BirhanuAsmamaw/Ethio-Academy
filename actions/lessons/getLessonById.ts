import prisma from "@/lib/prismadb"

export async function getLessonById(lessonId:string){
  try{
    const lesson = await prisma.lesson.findUnique({
      where:{id:lessonId},
      include:{
        contents:{
          include:{
            subContents:true
          }
        },
        chapter:{
          include:{
            course:{

              include:{
                subject:{
                  include:{
                    department:true
                  }
                },
                chapters:{
                  include:{
                    lessons:true
                  }
                }
              }
            }
          }
        },
        questions:true
      }
      
    });
  return lesson
  }catch(e){
    return null;
  }
  
}