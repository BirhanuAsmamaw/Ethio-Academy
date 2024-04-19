import prisma from "@/lib/prismadb"
import { getCurrentUser } from "../users/currentUser";

export async function getMyCourses(){
  try{
const user=await getCurrentUser();

if(!user){
  throw new Error("User not found");
}
const isDataAccessed=user?.permissions.some((permission)=>permission.permission.action === "CanManageOwnCourse" || permission.permission.action === "CanViewOwnCourse")
if(!isDataAccessed){
  throw new Error("Unauthorized access");
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