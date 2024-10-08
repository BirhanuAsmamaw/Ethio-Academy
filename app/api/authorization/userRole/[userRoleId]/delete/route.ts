
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
import { myPermissions } from "@/actions/authorization/myPermission";
export async function DELETE(req: Request, {params}:{params:{userRoleId:string}}){
  const userRoleId=params.userRoleId;
 

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


const isDataAccessed=permissions?.some((permission)=>permission?.action === "CanRemoveRole" )
if(!isDataAccessed){
  throw new Error("Forbidden Resourse")
}

   
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