import prisma from "@/lib/prismadb"
export async function getAllExamsCategory(){

  try{
    const examsCategory=await prisma.exam.findMany({
      include:{
        departments:{
          include:{
            subject:true
          }
        }
      }
    })
    return examsCategory
  }
  catch(err){}
}