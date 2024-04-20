
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function PUT(req: Request, {params}:{params:{id:string}}){
  const id=params.id;
  const body = await req.json();
  const {course,
 
     price,
     descriptions,
     requirements,
     whoShouldTake,} = body;

  try{
    const user=await  getCurrentUser();

    if(!user){
      return NextResponse.json({status:false, message:"unathorized"});
    }
    const isDataAccessed=user.permissions.some((permission)=>permission.permission.action === "CanManageOwnCourse" )
if(isDataAccessed){
  throw new Error(" forbidden resource")
}

    const courseData=await prisma.course.findUnique({
      where: {id:id,creatorId:user.id},
    })
    if(!courseData){
      return NextResponse.json({status:false, message:"course not found"});
    }

    const updatedCourse=await prisma.course.update({
      where: {id:id},
      data:{
        course:course,
        price:price,
        descriptions:descriptions,
        requirements:requirements,
        whoShouldTake:whoShouldTake
      }
    })
    return NextResponse.json(updatedCourse);
  }
  catch(err){}
}