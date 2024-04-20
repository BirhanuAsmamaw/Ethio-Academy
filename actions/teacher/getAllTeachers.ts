import prisma from "@/lib/prismadb"
export async function getAllTeachers(){
  try{

    const allTeachers=await prisma.teacher.findMany({
      include:{user:true}
    });
    return allTeachers
  }


  catch(e){
    return null;
  }
}