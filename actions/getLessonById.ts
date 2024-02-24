import prisma from "@/lib/prismadb"

export async function getLessonById(lessonId:string){
  try{
    const lesson = await prisma.lesson.findUnique({
      where:{id:lessonId},
      include:{
        chapter:{
          include:{
            course:true
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