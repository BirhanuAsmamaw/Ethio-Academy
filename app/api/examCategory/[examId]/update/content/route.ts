
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import { getCurrentUser } from "@/actions/users/currentUser";
export async function PUT(req: Request, {params}:{params:{examId:string}}){
  const examId=params.examId;
  const body = await req.json();
  const {exam,url} = body;

  try{
  // authorization
  const user = await getCurrentUser();
  if(!user){
    throw new Error("Unathorized")
  }
  
  
  const isDataAccessed=user.permissions.some((permission)=>permission.permission.action === "CanManageExamType" )
  if(!isDataAccessed){
    throw new Error("Forbidden Resourse")
  }

    const examData=await prisma.exam.findUnique({
      where: {id:examId}
    })
    if(!examData){
      return NextResponse.json({status:false, message:"Exam not found"});
    }

    const updatedexam=await prisma.exam.update({
      where: {id:examId},
      data:{
        examType:exam,
        url:url
      }
    })
    return NextResponse.json(updatedexam);
  }
  catch(err){
    throw new Error("Something went wrong")
  }
}