
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getCurrentUser } from "@/actions/users/currentUser";
export async function POST(req:Request){
  const body = await req.json();

  const user =await getCurrentUser();

  if (!user){
    return NextResponse.json({status:false, message:"unauthorized"});
  }

  const isDataAccessed=user.permissions.some((permission)=>permission.permission.action === "CanManageCourse" || permission.permission.action === "CanCreateCourse" || permission.permission.action === "CanManageOwnCourse" )

  if (!isDataAccessed){
  throw new Error("Unathorized")

  }

  const {
   
     price,
     descriptions,
     requirements,
     whoShouldTake,
     subjectId,
     course
  }=body;



  if (!subjectId || !descriptions || !requirements || !whoShouldTake|| !course ){
    throw new Error("invalid  parameters")

  }
  const newCourse=await prisma.course.create({
    data:{
      subjectId:subjectId,
      creatorId:user.id,
      course:course,
      price:parseFloat(price),
      rating:0,
      descriptions:descriptions,
      requirements:requirements,
      whoShouldTake:whoShouldTake
    }
  })

  return NextResponse.json(newCourse);
}