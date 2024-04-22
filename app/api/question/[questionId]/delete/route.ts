
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function DELETE(req: Request, {params}:{params:{questionId:string}}){
  const questionId=params.questionId;
 

  try{
       // authorization
const user = await getCurrentUser();
if(!user){
  throw new Error("Unathorized")
}

const isDataAccessed=user.permissions.some((permission)=>permission.permission.action === "CanManageOwnCourse" || permission.permission.action === "CanManageSubject" ||permission.permission.action === "CanManageDepartment"  )
if(!isDataAccessed){
  throw new Error("Forbidden Resourse")
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
    console.log(err);
  }
}