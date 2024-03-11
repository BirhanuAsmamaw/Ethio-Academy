 import prisma from "@/lib/prismadb"
export async function getDepartmentByName(name: string){
  try{
const department = await prisma.department.findUnique({
  where:{
    departmentName: name
  },
  include:{
    exam: true
  }
})

return department
  }
  catch(e){}
}