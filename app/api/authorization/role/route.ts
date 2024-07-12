import { myPermissions } from "@/actions/authorization/myPermission";
import { getCurrentUser } from "@/actions/users/currentUser";
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server";
export async function POST(req: Request, res: Response){
  const body=await req.json();
  try{
const {
  name
}=body;


// authorization
const user = await getCurrentUser();
if(!user){
  throw new Error("Unauthorized")
}

const permissions=await myPermissions();
    if(!permissions){
      return NextResponse.json({message:"permissions not found"},{status:404})
    }

const isDataAccessed=permissions?.some((permission)=>permission?.action === "CanManageRole" )
if(!isDataAccessed){
  throw new Error("Forbidden Resourse")
}
if(!name){
  throw new Error("Invalid name passed")
}


//create ROLES
const newPermission=await prisma.roles.create({
  data:{name:name}
});

return NextResponse.json(newPermission)
  }


  catch(err:any){
    throw new Error(err?.message)
  }

}