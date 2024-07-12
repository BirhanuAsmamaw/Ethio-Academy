import { getCurrentUser } from "../users/currentUser"
import prisma from "@/lib/prismadb"
export async function myTeacherAccount(){
  try{
    const user =await  getCurrentUser();
    if(!user){
      return null;
    }

    const myAccount=await prisma.teacher.findFirst({
      where:{
        userId:user?.id
      }
    });

    return myAccount;

  }
  catch(err){
    return null
  }
}