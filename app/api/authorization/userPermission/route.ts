import { myPermissions } from "@/actions/authorization/myPermission";
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
  throw new Error("Unauthorized")
}

const permissions=await myPermissions();
if(!permissions){
  return NextResponse.json({message:"Forbidden Resources"},{status:404})
}

const isDataAccessed=permissions?.some((permission)=>permission?.action === "CanAssignPermission" )
if(!isDataAccessed){
  throw new Error("Forbidden Resources")
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