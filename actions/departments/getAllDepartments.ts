import prisma from "@/lib/prismadb"
export async function getAllDepartments(){
  try{
    const departments=await prisma.department.findMany({
      include:{ 
        subject:true,
        exam:true},
      
    })
    return departments
  }
  catch(e){
    return null;
  }
}