
import prisma from "@/lib/prismadb"
export async function getUniversityByCode(code:string){
  try{

    const university=await prisma.university.findFirst({
      where:{code:code}
    });

    return university;
  }
  catch(e){
    return  null;
  }
}