
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
import { myPermissions } from "@/actions/authorization/myPermission";
export async function DELETE(req: Request, {params}:{params:{examId:string}}){
  const examId=params.examId;
 

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

   
   const isDataAccessed=permissions?.some((permission)=>permission?.action === "CanManageExamType" )
   if(!isDataAccessed){
     throw new Error("Forbidden Recourse")
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