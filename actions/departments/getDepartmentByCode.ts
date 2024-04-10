import prisma from "@/lib/prismadb"
export async function getDepartmentByCode(code: string){
  try{
    const department=await prisma.department.findUnique({
     where:{url:code},
     include:{
      subject:true
     }
    })
    return department
  }
  catch(e){
    return null;
  }
}