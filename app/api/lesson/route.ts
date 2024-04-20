import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function POST(req:Request) {
  const body=await req.json();

  try{
  const {chapterId,
    title }=body;

      // authorization
const user = await getCurrentUser();
if(!user){
  throw new Error("Unathorized")
}

if(!chapterId || !title ) {
throw new Error("Invalid  parameters");
 }

const isDataAccessed=user.permissions.some((permission)=>permission.permission.action === "CanManageOwnCourse" )
if(!isDataAccessed){
  throw new Error("Forbidden Resourse")
}

const chapter=await prisma.chapter.findFirst({
  where:{
    id:chapterId,
    course:{
      creatorId:user.id
    }
    
  }
})


if(!chapter){
  throw new Error("No chapter Found!")
}
     const newLesson= await prisma.lesson.create({
      data:{
        chapterId:chapter.id, 
        title:title,
         }
     })
     return NextResponse.json(newLesson);
    }
    catch(err) {
      throw new Error("something went wrong")
    }
}