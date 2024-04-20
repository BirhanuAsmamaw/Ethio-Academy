
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function PUT(req: Request, {params}:{params:{lessonId:string}}){
  const lessonId=params.lessonId;
  const body = await req.json();
  const {video} = body;

  try{
     // authorization
const user = await getCurrentUser();
if(!user){
  throw new Error("Unathorized")
}

if(!lessonId ) {
throw new Error("Invalid  parameters");
 }

const isDataAccessed=user.permissions.some((permission)=>permission.permission.action === "CanManageOwnCourse" )
if(!isDataAccessed){
  throw new Error("Forbidden Resourse")
}

const lesson=await prisma.lesson.findFirst({
  where:{
    id:lessonId,
    chapter:{
      course:{
        creatorId:user.id,
      }
    }
  }
})


if(!lesson){
  throw new Error("No lesson Found!")
}

    const updatedLesson=await prisma.lesson.update({
      where: {id:lesson.id},
      data:{
       videoUrl:video
      }
    })
    return NextResponse.json(updatedLesson);
  }
  catch(err){
    throw new Error("Something went wrong")
  }
}