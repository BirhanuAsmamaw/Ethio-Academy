import prisma from "@/lib/prismadb"
import { getCurrentUser } from "../users/currentUser";

export async function getMyCourses(){
  try{
const user=await getCurrentUser();

if(!user){
  throw new Error("User not found");
}

const myCourses=await prisma.course.findMany({
  where:{
    creatorId: user.id
  }
})


return myCourses;
  }



  catch(e){
    return null;
  }
}