import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function GET(req:Request,{params}:{params:{examId:string}}){
  const examId=params.examId
  try{
    const departments=await prisma.department.findMany({
      where:{examId: examId}
    })
    return  NextResponse.json(departments)
  }
  catch(err){
    return NextResponse.json({message:"something went wrong"})
  }
}