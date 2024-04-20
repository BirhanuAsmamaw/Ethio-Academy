import { NextResponse } from "next/server";
import prisma from '@/lib/prismadb'
import { getCurrentUser } from "@/actions/users/currentUser";
export async function POST(req:Request){
 const body=await req.json();
 const {title,courseId}=body;
 if(!title){
  return NextResponse.json({
    status:false,
    message:"title and courseId is not empty",
  });
 }

// authorization
const user = await getCurrentUser();
if(!user){
  throw new Error("Unathorized")
}

const isDataAccessed=user.permissions.some((permission)=>permission.permission.action === "CanManageOwnCourse" )
if(!isDataAccessed){
  throw new Error("Forbidden Resourse")
}

const course=await prisma.course.findFirst({
  where:{id:courseId,creatorId:user.id}
})
if(!course){
  throw new Error("No Course found")
}
 const newChapter=await prisma.chapter.create({
 
  data:{
    courseId:course.id,
    title:title,
  }
 });

 return NextResponse.json(newChapter);


}