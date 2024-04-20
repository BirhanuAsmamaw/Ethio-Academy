
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function DELETE(req: Request, {params}:{params:{subjectId:string}}){
  const subjectId=params.subjectId;
 

  try{
    const user = await getCurrentUser();
    if(!user){
      throw new Error("Unathorized")
    }
    
    
    const isDataAccessed=user.permissions.some((permission)=>permission.permission.action === "CanManageSubject" )
    if(isDataAccessed){
      throw new Error("Forbidden Resourse")
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