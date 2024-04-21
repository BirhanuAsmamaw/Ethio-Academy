
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function PUT(req: Request, {params}:{params:{contentId:string}}){
  const contentId=params.contentId;
  const body = await req.json();
  const {content} = body;

  try{
    // authorization
const user = await getCurrentUser();
if(!user){
  throw new Error("Unathorized")
}

if(!contentId ) {
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
const contentData=await prisma.content.findFirst({
  where:{
    id:contentId,
    lesson:{
      chapter:{
        course:{
          instructorId:user.teacher.id
        }
      }
    }
  }
})


if(!contentData){
  throw new Error("No content Found!")
}

    const updatedcontent=await prisma.content.update({
      where: {id:contentData.id},
      data:{
        content:content
       
      }
    })
    return NextResponse.json(updatedcontent);
  }
  catch(err){
    throw new Error("Something went wrong")
  }
}