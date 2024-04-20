import { getCurrentUser } from "@/actions/users/currentUser";
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server";
export async function POST(req: Request, res: Response){
  const body=await req.json();
  try{
const {
  userId,
  permissionId
}=body;

// authorization
const user = await getCurrentUser();
if(!user){
  throw new Error("Unathorized")
}

const isDataAccessed=user.permissions.some((permission)=>permission.permission.action === "CanAssignPermission" )
if(!isDataAccessed){
  throw new Error("Forbidden Resourse")
}
if(!userId || !permissionId){
  throw new Error("Invalid user and permission passed")
}


//create userPERMISSION
const newuserPermission=await prisma.userPermission.create({
  data:{
    userId:userId,
    permissionId:permissionId
  }
});

return NextResponse.json(newuserPermission)
  }


  catch(err:any){
    throw new Error(err?.message)
  }

}