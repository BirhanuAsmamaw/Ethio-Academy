 import prisma from "@/lib/prismadb"
export async function getExamTypeById(id: string){
  try{
    const exam=await prisma.exam.findUnique({
      where:{id:id},
      include:{
        departments:{
          include:{
            subject:true
          }
        }
      }
    });
    return exam
  }
  catch(e){
    return null;
  }
}