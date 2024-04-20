
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function DELETE(req: Request, {params}:{params:{userpermissionId:string}}){
  const userPermissionId=params.userpermissionId;
 

  try{
   
// authorization
const user = await getCurrentUser();
if(!user){
  throw new Error("Unathorized")
}

const isDataAccessed=user.permissions.some((permission)=>permission.permission.action === "CanRemovePermission" )
if(isDataAccessed){
  throw new Error("Forbidden Resourse")
}
   
    const userPermission=await prisma.userPermission.findUnique({
      where: {id:userPermissionId}
    })
    if(!userPermission){
     throw new Error("User permission not found")
    }

 await prisma.userPermission.delete({
      where: {id:userPermissionId},
      
    })
    return NextResponse.json({
      success:true,
      message:"userPermission deleted successfully"
    });
  }
  catch(err){
   throw new Error("something went wrong")
  }
}