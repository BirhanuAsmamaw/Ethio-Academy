import { getCurrentUser } from "@/actions/users/currentUser";
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server";
export async function POST(req: Request, res: Response){
  const body=await req.json();
  try{
const {
  action
}=body;

// authorization
const user = await getCurrentUser();
if(!user){
  throw new Error("Unathorized")
}

const isDataAccessed=user.permissions.some((permission)=>permission.permission.action === "CanManagePermission" )
if(isDataAccessed){
  throw new Error("Forbidden Resourse")
}

if(!action){
  throw new Error("Invalid action passed")
}


//create PERMISSION
const newPermission=await prisma.permission.create({

  data:{action:action}
});

return NextResponse.json(newPermission)
  }


  catch(err:any){
    throw new Error(err?.message)
  }

}