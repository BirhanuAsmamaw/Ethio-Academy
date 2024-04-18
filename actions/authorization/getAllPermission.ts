import prisma from "@/lib/prismadb"
export async function getAllPermission(){
  try{

    const permissions=await prisma.permission.findMany({
    })
    return permissions;
  }
  catch(e){
    return null;
  }
}