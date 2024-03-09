import prisma from "@/lib/prismadb"

export async function getDepartmentByExamType(examId: string){
  try{
    const departments=await prisma.department.findMany({
      where:{examId: examId}
    })
    return departments
  }
  catch(err){}
}