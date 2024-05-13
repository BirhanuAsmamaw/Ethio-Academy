import prisma from "@/lib/prismadb"
import { getCurrentUser } from "./currentUser";

export async function getAllUsers(){
  try{
    const user=await  getCurrentUser();
   
    if(!user){
      throw new Error("Unathorized")
    }
    
    
    // const isDataAccessed=user.permissions.some((permission)=>permission.permission.action === "CanManageUser" )
    // if(!isDataAccessed){
    //   throw new Error("Forbidden Resourse")
    // }
    
    
    const users = await prisma.user.findMany({
      include:{
        payedCourses:true,
        permissions:{
          include:{
            permission:true
          },
          
        },
      }
      
    });
  return users
  }catch(e){
    return null;
  }
  
}