import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response){
  const body = await req.json();
  try{
  const {examId,department}=body
  if (!examId || !department){
    return NextResponse.json({
      status:false,
      message:"invalid parameters"
    })
  }
    const newDepartment=await prisma.department.create({
      data:{
        examId:examId,
        departmentName:department
      }
    })

    return NextResponse.json(newDepartment);

  }

  catch(err){}
}