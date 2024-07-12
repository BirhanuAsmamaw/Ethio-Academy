import { myPermissions } from "@/actions/authorization/myPermission";
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

const permissions=await myPermissions();
    if(!permissions){
      return NextResponse.json({message:"permissions not found"},{status:404})
    }

const isDataAccessed=permissions?.some((permission)=>permission?.action === "CanGroupPermission" )
if(!isDataAccessed){
  throw new Error("Forbidden Resourse")
}

if(!roleId || !permissionId){
  throw new Error("Invalid role and permission passed")
}

//create ROLE PERMISSION
const newRolePermission=await prisma.rolePermission.create({
  data:{
    roleId:roleId,
    permissionId:permissionId
  }
});

return NextResponse.json(newRolePermission)
  }


  catch(err:any){
    return NextResponse.json({message:"Something went wrong!"},{status:500})
  }

}