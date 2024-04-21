
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function DELETE(req: Request, {params}:{params:{chapterId:string}}){
  const chapterId=params.chapterId;
 

  try{
    // authorization
const user = await getCurrentUser();
if(!user){
  throw new Error("Unathorized")
}

const isDataAccessed=user.permissions.some((permission)=>permission.permission.action === "CanManageOwnCourse" )
if(!isDataAccessed){
  throw new Error("Forbidden Resourse")
}

if(!user.teacher){
  throw new Error("Unathorized")
}

if(!user.teacher.status){
  throw new Error("Unathorized")
} 

const Chapter=await prisma.chapter.findFirst({
  where:{
    id:chapterId,
    course:{
      instructorId:user.teacher.id
    }

  }
})
if(!Chapter){
  throw new Error("No Chapter found")
}

  
  await prisma.chapter.delete({
      where: {id:chapterId}
      
    })
    return NextResponse.json({
      message:"Chapter deleted successfully"
    });
  }
  catch(err){
    console.log(err);
  }
}