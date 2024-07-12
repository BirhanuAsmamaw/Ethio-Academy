import { myPermissions } from "@/actions/authorization/myPermission";
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
  throw new Error("Unauthorized")
}

const permissions=await myPermissions();
if(!permissions){
  return NextResponse.json({message:"Forbidden Resources"},{status:404})
}
const isDataAccessed=permissions?.some((permission)=>permission?.action === "CanManagePermission" )
if(!isDataAccessed){
  return NextResponse.json({message:"Forbidden Resourse"},{status:404})
  
}

if(!action){
  return NextResponse.json({message:"Invalid action passed"},{status:400})
 
}


//create PERMISSION
const newPermission=await prisma.permission.create({

  data:{action:action}
});

return NextResponse.json(newPermission,{status:200})
  }


  catch(err:any){
    return NextResponse.json({message:"something went wrong!"},{status:500})
  }

}