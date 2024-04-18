import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server";
export async function POST(req: Request, res: Response){
  const body=await req.json();
  try{
const {
  roleId,
  permissionId
}=body;

if(!roleId || !permissionId){
  throw new Error("Invalid role and permission passed")
}
//authorized

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