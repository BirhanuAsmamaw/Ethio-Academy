
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
import { myPermissions } from "@/actions/authorization/myPermission";
export async function DELETE(req: Request, {params}:{params:{userpermissionId:string}}){
  const userPermissionId=params.userpermissionId;
 

  try{
// authorization
const user = await getCurrentUser();
if(!user){
  throw new Error("Unauthorized")
}

const permissions=await myPermissions();
if(!permissions){
  return NextResponse.json({message:"Forbidden Resources"},{status:404})
}

const isDataAccessed=permissions?.some((permission)=>permission?.action === "CanRemovePermission" )
if(!isDataAccessed){
  throw new Error("Forbidden Resources")
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