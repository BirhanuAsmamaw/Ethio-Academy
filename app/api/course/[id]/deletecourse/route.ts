
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function DELETE(req: Request, {params}:{params:{id:string}}){
  const id=params.id;
 

  try{
    const user=await  getCurrentUser();

    if(!user){
      return NextResponse.json({status:false, message:"unathorized"});
    }
    const isDataAccessed=user.permissions.some((permission)=>permission.permission.action === "CanManageOwnCourse" )
if(isDataAccessed){
  throw new Error("Forbidden resource")
}
    const course=await prisma.course.findUnique({
      where: {id:id,creatorId:user.id}
    })
    if(!course){
      return NextResponse.json({status:false, message:"course not found"});
    }

 await prisma.course.delete({
      where: {id:id},
      
    })
    return NextResponse.json({
      success:true,
      message:"course deleted successfully"
    });
  }
  catch(err){
    console.log(err);
  }
}