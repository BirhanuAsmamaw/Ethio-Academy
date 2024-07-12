import prisma from "@/lib/prismadb"
import { getCurrentUser } from "../users/currentUser";
export async function myPermissions(){
  try{

    const user =await getCurrentUser();

    if(!user){
      return null;
    }

    const permissions=await prisma.permission.findMany({
      where:{
        users:{
      some:{
        userId:user?.id
      }
        }
      }
    })
    return permissions;
  }
  catch(e){
    return null;
  }
}