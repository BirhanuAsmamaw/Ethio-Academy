import prisma from "@/lib/prismadb"

export async function getAllUsers(){
  try{
    const users = await prisma.user.findMany({
      include:{
        payedCourses:true
      }
      
    });
  return users
  }catch(e){
    return null;
  }
  
}