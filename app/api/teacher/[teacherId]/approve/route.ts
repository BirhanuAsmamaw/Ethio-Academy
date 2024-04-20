
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function PUT(req: Request, {params}:{params:{teacherId:string}}){
  const teacherId=params.teacherId;
  const body = await req.json();
  const {status} = body;

  try{
    const user = await getCurrentUser();
    if(!user){
      throw new Error("Unathorized")
    }
    
    
    const isDataAccessed=user.permissions.some((permission)=>permission.permission.action === "CanApprovedTeacher" )
    if(!isDataAccessed){
      throw new Error("Forbidden Resourse")
    }

    const teacherData=await prisma.teacher.findUnique({
      where: {id:teacherId}
    })
    if(!teacherData){
   throw new Error("teacher not found");
    }

    const updatedteacher=await prisma.teacher.update({
      where: {id:teacherId},
      data:{
     status:status
      }
    })
    return NextResponse.json(updatedteacher);
  }
  catch(err){
    throw new Error("Something went wrong")
  }
}