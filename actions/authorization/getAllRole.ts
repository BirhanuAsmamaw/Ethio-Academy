import prisma from "@/lib/prismadb"
export async function getAllRoles(){
  try{

    const roles=await prisma.roles.findMany({
    })
    return roles;
  }
  catch(e){
    return null;
  }
}