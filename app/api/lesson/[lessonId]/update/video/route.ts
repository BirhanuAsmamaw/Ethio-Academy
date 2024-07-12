
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
import { myTeacherAccount } from "@/actions/teacher/myAccount";
import { myPermissions } from "@/actions/authorization/myPermission";
export async function PUT(req: Request, {params}:{params:{lessonId:string}}){
  const lessonId=params.lessonId;
  const body = await req.json();
  const {video} = body;

  try{
    const myAccount:any=await myTeacherAccount()
    // authorization
    const user = await getCurrentUser();
    if(!user){
      return NextResponse.json({message:"Unauthorized"},{status:400})
      
    }
    
    
    const permissions=await myPermissions();
        if(!permissions){
          return NextResponse.json({message:"permissions not found"},{status:404})
        }

if(!lessonId ) {
throw new Error("Invalid  parameters");
 }

const isDataAccessed=permissions.some((permission)=>permission?.action === "CanManageOwnCourse" )
if(!isDataAccessed){
  throw new Error("Forbidden Resources")
}

if(!myAccount){
  throw new Error("Unauthorized")
}

if(!myAccount?.status){
  throw new Error("Unauthorized")
} 
const lesson=await prisma.lesson.findFirst({
  where:{
    id:lessonId,
    chapter:{
      course:{
        instructorId:myAccount?.id,
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