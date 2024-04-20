
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function DELETE(req: Request, {params}:{params:{contentId:string}}){
  const contentId=params.contentId;
 

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
if(isDataAccessed){
  throw new Error("Forbidden Resourse")
}

const content=await prisma.content.findFirst({
  where:{
    id:contentId,
    lesson:{
      chapter:{
        course:{
          creatorId:user.id
        }
      }
    }
  }
})


if(!content){
  throw new Error("No content Found!")
}

 await prisma.content.delete({
      where: {id:content.id},
      
    })
    return NextResponse.json({
      success:true,
      message:"content deleted successfully"
    });
  }
  catch(err){
    throw new Error("Something went wrong")
 
  }
}