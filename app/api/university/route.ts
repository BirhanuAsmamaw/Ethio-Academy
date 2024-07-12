
import { myPermissions } from "@/actions/authorization/myPermission";
import { getCurrentUser } from "@/actions/users/currentUser";
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server";
export async function POST(req: Request, res: Response){
  const body=await req.json();
  try{
    const {name, code,}=body

    
    // authorization
    const user = await getCurrentUser();
    if(!user){
      return NextResponse.json({message:"Unauthorized"},{status:400})
      
    }
    
    
    const permissions=await myPermissions();
        if(!permissions){
          return NextResponse.json({message:"permissions not found"},{status:404})
        }
    
    const isDataAccessed=permissions?.some((permission)=>permission?.action === "CanManageUniversity" )
    if(!isDataAccessed){
      throw new Error("Forbidden Resourse")
    }
    
    if(!name|| !code){
      throw new Error(`Invalid parameters`);
    }
    const newUniversity= await prisma.university.create({
      data: {name:name,code:code}
    })

    return NextResponse.json(newUniversity);
  }
  catch(err){
throw new Error("Something went wrong")
  }
}