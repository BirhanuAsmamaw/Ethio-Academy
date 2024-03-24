import { getCurrentUser } from "@/actions/users/currentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
export async function POST(req:Request) {

  const body=await req.json();

  try{
    const {examType,url}=body

    if(!examType || !url){
      return NextResponse.json({message:"exams not empty",status: false})
    }
    const user=await getCurrentUser();
    if (!user) {
      return NextResponse.json({message:"unAuthorized",status: false})
    }
    if (user.role!=="ADMIN") {
      return NextResponse.json({message:"unAuthorized",status: false})
    }
    const newExams=await  prisma.exam.create({
      data:{
        url:url,
        examType:examType,
      }
    })

    return NextResponse.json(newExams)

  }
  catch(err){};
}