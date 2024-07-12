
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
import { myPermissions } from "@/actions/authorization/myPermission";
export async function DELETE(req: Request, {params}:{params:{subjectId:string}}){
  const subjectId=params.subjectId;
 

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
    
    const isDataAccessed=permissions?.some((permission)=>permission?.action === "CanManageSubject" )
    if(!isDataAccessed){
      throw new Error("Forbidden Resources")
    }
    const subject=await prisma.subject.findUnique({
      where: {id:subjectId}
    })
    if(!subject){
     throw new Error("subject not found");
    }

 await prisma.subject.delete({
      where: {id:subjectId},
      
    })
    return NextResponse.json({
      success:true,
      message:"subject deleted successfully"
    });
  }
  catch(err){
  throw new Error("Something went wrong")
  }
}