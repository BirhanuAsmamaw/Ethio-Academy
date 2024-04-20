import { getCurrentUser } from "@/actions/users/currentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
export async function POST(req:Request) {

  const body=await req.json();

  try{
    const {examType,url}=body
     // authorization
     const user = await getCurrentUser();
     if(!user){
       throw new Error("Unathorized")
     }
     
     
     const isDataAccessed=user.permissions.some((permission)=>permission.permission.action === "CanManageExamType" )
     if(!isDataAccessed){
       throw new Error("Forbidden Resourse")
     }

    if(!examType || !url){
      return NextResponse.json({message:"exams not empty",status: false})
    }
   
    const newExams=await  prisma.exam.create({
      data:{
        url:url,
        examType:examType,
      }
    })

    return NextResponse.json(newExams)

  }
  catch(err){
    throw new Error("Something went wrong")
  };
}