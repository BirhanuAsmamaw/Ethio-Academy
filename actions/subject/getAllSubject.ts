import prisma from "@/lib/prismadb"
export async function getAllSubject(){
  try{
    const subjects = await prisma.subject.findMany();
  return subjects
  }catch(e){
    return null;
  }
}