
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function PUT(req: Request, {params}:{params:{chapterId:string}}){
  const chapterId=params.chapterId;
  const body = await req.json();
  const {title} = body;

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
    const updatedChapter=await prisma.chapter.update({
      where: {id:chapterId},
      data:{
       title:title,
      }
    })
    return NextResponse.json(updatedChapter);
  }
  catch(err){}
}