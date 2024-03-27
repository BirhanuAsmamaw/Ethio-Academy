import prisma from "@/lib/prismadb"

export async function getDepartmentByExamType(exam: string){
  try{
    const departments=await prisma.department.findMany({
      where:{exam:{
        url:exam
      }}
    })
    return departments
  }
  catch(err){}
}