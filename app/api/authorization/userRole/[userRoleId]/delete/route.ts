
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function DELETE(req: Request, {params}:{params:{userRoleId:string}}){
  const userRoleId=params.userRoleId;
 

  try{
    const user=await  getCurrentUser();

   
    const userRole=await prisma.userRole.findUnique({
      where: {id:userRoleId}
    })
    if(!userRole){
     throw new Error("User role not found")
    }

 await prisma.userRole.delete({
      where: {id:userRoleId},
      
    })
    return NextResponse.json({
      success:true,
      message:"userRole deleted successfully"
    });
  }
  catch(err){
    throw new Error("something went wrong")
  }
}