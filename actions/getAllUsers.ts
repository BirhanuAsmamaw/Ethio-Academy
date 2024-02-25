import prisma from "@/lib/prismadb"

export async function getAllUsers(){
  try{
    const users = await prisma.user.findMany({
      
    });
  return users
  }catch(e){
    return null;
  }
  
}