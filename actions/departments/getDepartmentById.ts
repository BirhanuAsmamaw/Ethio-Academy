import prisma from "@/lib/prismadb"
export async function getDepartmentById(id: string){
  try{
    const department = await prisma.department.findUnique({
      where:{id: id},
      include:{
        exam:true
      }
    })
    return department
  }
  catch(e){}
}