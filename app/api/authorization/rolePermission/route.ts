import { getCurrentUser } from "@/actions/users/currentUser";
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server";
export async function POST(req: Request, res: Response){
  const body=await req.json();
  try{
const {
  roleId,
  permissionId
}=body;

// authorization
const user = await getCurrentUser();
if(!user){
  throw new Error("Unathorized")
}

const isDataAccessed=user.permissions.some((permission)=>permission.permission.action === "CanGroupPermission" )
if(isDataAccessed){
  throw new Error("Forbidden Resourse")
}

if(!roleId || !permissionId){
  throw new Error("Invalid role and permission passed")
}

//create ROLEPERMISSION
const newRolePermission=await prisma.rolePermission.create({
  data:{
    roleId:roleId,
    permissionId:permissionId
  }
});

return NextResponse.json(newRolePermission)
  }


  catch(err:any){
    throw new Error(err?.message)
  }

}