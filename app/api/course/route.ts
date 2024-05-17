
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getCurrentUser } from "@/actions/users/currentUser";
import { getAllUsers } from "@/actions/users/getAllUsers";
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

  
 

  if(!user.teacher){
    throw new Error("Unathorized")
  }

  if(!user.teacher.status){
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
      instructorId:user.teacher.id,
      course:course,
      price:parseFloat(price),
      rating:0,
      descriptions:descriptions,
      requirements:requirements,
      whoShouldTake:whoShouldTake
    }
  })

  const users = await getAllUsers();
  const subscribers = users?.filter((u) => user?.teacher?.subscribers.some((sub) => sub.userId === u.id))
    .map((subscriber) => ({
      id: subscriber.id,
      name: subscriber.name||"",
      email: subscriber.email ||""
    }));

  await prisma.notification.create({
    data:{
      url:`/course/${newCourse.id}`,
      type:"Success",
      title:"New Course Created",
      message:`${user.teacher.accountName || user.name} is created ${newCourse.course} course`,
      userId:user.id,
      customers:subscribers
    }
  });

  return NextResponse.json(newCourse);
}