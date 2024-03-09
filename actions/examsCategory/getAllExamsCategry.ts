import prisma from "@/lib/prismadb"
export async function getAllExamsCategory(){

  try{
    const examsCategory=await prisma.exam.findMany({
    })
    return examsCategory
  }
  catch(err){}
}