
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
import { myPermissions } from "@/actions/authorization/myPermission";
export async function DELETE(req: Request, {params}:{params:{userId:string}}){
  const userId=params.userId;
 

  try{
 
    // authorization
    const user = await getCurrentUser();
    if(!user){
      return NextResponse.json({message:"Unauthorized"},{status:400})
      
    }
    
    
    const permissions=await myPermissions();
        if(!permissions){
          return NextResponse.json({message:"permissions not found"},{status:404})
        }
    
    const isDataAccessed=permissions?.some((permission)=>permission?.action === "CanManageUser" )
    if(!isDataAccessed){
      throw new Error("Forbidden Resources")
    }

    const userData=await prisma.user.findUnique({
      where: {id:userId}
    })
    if(!userData){
      return NextResponse.json({status:false, message:"user not found"});
    }
await prisma.user.delete({
      where: {id:userId},
      
    })
    return NextResponse.json({
      success: true,
      message:"User deleted successfully"
    });
  }
  catch(err){
    return NextResponse.json({message:"Something went wrong"},{status:500})
  }
}