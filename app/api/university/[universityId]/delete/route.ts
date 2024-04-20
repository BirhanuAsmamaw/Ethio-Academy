
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function DELETE(req: Request, {params}:{params:{universityId:string}}){
  const universityId=params.universityId;
 

  try{
    const user=await  getCurrentUser();
   
    if(!user){
      throw new Error("Unathorized")
    }
    
    
    const isDataAccessed=user.permissions.some((permission)=>permission.permission.action === "CanManageUniversity" )
    if(isDataAccessed){
      throw new Error("Forbidden Resourse")
    }
    
    const university=await prisma.university.findUnique({
      where: {id:universityId}
    })
    if(!university){
   throw new Error("university not found");
    }

 await prisma.university.delete({
      where: {id:universityId},
      
    })
    return NextResponse.json({
      success:true,
      message:"university deleted successfully"
    });
  }
  catch(err){
    throw new Error("Something went wrong")
  }
}