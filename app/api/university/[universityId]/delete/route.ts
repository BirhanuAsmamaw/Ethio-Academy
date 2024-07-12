
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
import { myPermissions } from "@/actions/authorization/myPermission";
export async function DELETE(req: Request, {params}:{params:{universityId:string}}){
  const universityId=params.universityId;
 

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
    
    const isDataAccessed=permissions.some((permission)=>permission?.action === "CanManageUniversity" )
    if(!isDataAccessed){
      throw new Error("Forbidden Resources")
    }
    
    const university=await prisma.university.findUnique({
      where: {id:universityId}
    })
    if(!university){
   throw new Error("university not found");
    }

 await prisma.university.delete({
      where: {id:universityId},
      
    })
    return NextResponse.json({
      success:true,
      message:"university deleted successfully"
    });
  }
  catch(err){
    throw new Error("Something went wrong")
  }
}