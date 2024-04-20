
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function DELETE(req: Request, {params}:{params:{examId:string}}){
  const examId=params.examId;
 

  try{
   // authorization
   const user = await getCurrentUser();
   if(!user){
     throw new Error("Unathorized")
   }
   
   
   const isDataAccessed=user.permissions.some((permission)=>permission.permission.action === "CanManageExamType" )
   if(isDataAccessed){
     throw new Error("Forbidden Resourse")
   }
    const exam=await prisma.exam.findUnique({
      where: {id:examId}
    })
    if(!exam){
      return NextResponse.json({status:false, message:"exam not found"});
    }

 await prisma.exam.delete({
      where: {id:examId},
      
    })
    return NextResponse.json({
      success:true,
      message:"exam deleted successfully"
    });
  }
  catch(err){
   throw new Error("Something went wrong")
  }
}