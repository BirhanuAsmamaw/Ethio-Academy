import { getCurrentUser } from "@/actions/users/currentUser";
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server";
export async function PUT(req: Request, {params}:{params:{id:string}}){
  const id=params.id;
  const body = await req.json();
  try{
   const {cover} = body
const user = await getCurrentUser();
if(!user){
  throw new Error("Unathorized")
}
const isDataAccessed=user.permissions.some((permission)=>permission.permission.action === "CanManageOwnCourse" )
if(!isDataAccessed){
  throw new Error("Forbidden Resourse")
}
   if(!cover){
    throw new Error('Cover not Empty');
   }

   if(!user.teacher){
    throw new Error("Unathorized")
  }

  if(!user.teacher.status){
    throw new Error("Unathorized")
  }
   const course=await prisma.course.update({
    where: {id:id,instructorId:user.teacher.id},
    data:{cover:cover}

   })
   return NextResponse.json(course)

  }
  catch(err){
    throw new Error("Cover Could not be updated")
  }
}