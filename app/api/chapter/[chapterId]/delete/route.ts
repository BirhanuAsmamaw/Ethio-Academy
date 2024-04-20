
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

const Chapter=await prisma.chapter.findFirst({
  where:{
    id:chapterId,
    course:{
      creatorId:user.id
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