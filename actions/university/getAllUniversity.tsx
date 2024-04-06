import prisma from "@/lib/prismadb"
export async function getAllUniversity(){
  try{
    const university=await prisma.university.findMany()
    return university;
  }
  catch(e){
    return null
  }
}