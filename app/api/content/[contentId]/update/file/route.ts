
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function PUT(req: Request, {params}:{params:{contentId:string}}){
  const contentId=params.contentId;
  const body = await req.json();
  const {image} = body;

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

const contentData=await prisma.content.findFirst({
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


if(!contentData){
  throw new Error("No content Found!")
}

    const updatedimage=await prisma.content.update({
      where: {id:contentData.id},
      data:{
        image:image,
       
      }
    })
    return NextResponse.json(updatedimage);
  }
  catch(err){
    throw new Error("Something went wrong")
  }
}