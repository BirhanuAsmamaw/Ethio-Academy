import { getCurrentUser } from "@/actions/users/currentUser";
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server";
export async function POST(req: Request, res: Response){
  const body=await req.json();
  try{
const {
  userId,
  roleId
}=body;

// authorization
const user = await getCurrentUser();
if(!user){
  throw new Error("Unathorized")
}

const isDataAccessed=user.permissions.some((permission)=>permission.permission.action === "CanAssignRole" )
if(isDataAccessed){
  throw new Error("Forbidden Resourse")
}
if(!userId || !roleId){
  throw new Error("Invalid user and role passed")
}


//create userrole
const newuserRole=await prisma.userRole.create({
  data:{
    userId:userId,
    roleId:roleId
  }
});

return NextResponse.json(newuserRole)
  }


  catch(err:any){
    throw new Error(err?.message)
  }

}