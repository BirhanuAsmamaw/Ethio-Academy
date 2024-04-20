import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function POST(req:Request) {
  const body=await req.json();



  try{

    const {lessonId,
      content ,
     image
       }=body;
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

const newContent= await prisma.content.create({
  data:{
    lessonId:lesson.id, 
    content:content,
    image:image
     }
 })
 return NextResponse.json(newContent);
}

  catch(err){
    throw new Error("something went wrong")
  };
     
  
}