
import prisma from "@/lib/prismadb"
export async function getUniversityById(id:string){
  try{

    const university=await prisma.university.findUnique({
      where:{id:id}
    });

    return university;
  }
  catch(e){
    return  null;
  }
}