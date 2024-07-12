
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
import { myPermissions } from "@/actions/authorization/myPermission";
export async function DELETE(req: Request, {params}:{params:{departmentId:string}}){
  const departmentId=params.departmentId;
 

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

const isDataAccessed=permissions?.some((permission)=>permission?.action === "CanManageDepartment" )
if(!isDataAccessed){
  throw new Error("Forbidden Resources")
}

    const department=await prisma.department.findUnique({
      where: {id:departmentId}
    })
    if(!department){
      return NextResponse.json({status:false, message:"department not found"});
    }

 await prisma.department.delete({
      where: {id:departmentId},
      
    })
    return NextResponse.json({
      success:true,
      message:"department deleted successfully"
    });
  }
  catch(err){
   throw new Error("Something went wrong");
  }
}