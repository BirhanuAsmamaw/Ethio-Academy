import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";

export async function POST(req:Request) {
  const body=await req.json();



  try{

    const {lessonId,
      language,
      content ,
      code,
     image
       }=body;


       let codeExample;
       if(!code || !language){
        codeExample=null
       }
       codeExample=language&&code?{
        language:language,
        code:code
       }:null
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




   if(!user.teacher){
    throw new Error("Unathorized")
  }

  if(!user.teacher.status){
    throw new Error("Unathorized")
  }

const lesson=await prisma.lesson.findFirst({
  where:{
    id:lessonId,
    chapter:{
      course:{
        instructorId:user.teacher.id,
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
    image:image,
    codeExample:codeExample
    
    
     }
 })
 return NextResponse.json(newContent);
}

  catch(err){
    throw new Error("something went wrong")
  };
     
  
}