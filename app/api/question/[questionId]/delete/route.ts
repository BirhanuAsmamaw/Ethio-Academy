
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
import { myPermissions } from "@/actions/authorization/myPermission";
export async function DELETE(req: Request, {params}:{params:{questionId:string}}){
  const questionId=params.questionId;
 

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

const isDataAccessed=permissions?.some((permission)=>permission?.action === "CanManageOwnCourse" || permission?.action === "CanManageSubject" ||permission?.action === "CanManageDepartment"  )
if(!isDataAccessed){
  throw new Error("Forbidden Resources")
}
    const question=await prisma.question.findUnique({
      where: {id:questionId}
    })
    if(!question){
      return NextResponse.json({status:false, message:"question not found"});
    }

 await prisma.question.delete({
      where: {id:questionId},
      
    })
    return NextResponse.json({
      success:true,
      message:"question deleted successfully"
    });
  }
  catch(err){
    return NextResponse.json({message:"Something went wrong"},{status:500})
  }
}