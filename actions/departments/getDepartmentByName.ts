 import prisma from "@/lib/prismadb"
export async function getDepartmentByName(name: string){
  try{
const department = await prisma.department.findUnique({
  where:{
    url: name
  },
  include:{
    exam: true,
    subject:true
  },
  
})

return department
  }
  catch(e){}
}