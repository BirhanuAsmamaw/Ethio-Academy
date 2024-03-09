import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response){
  const body = await req.json();
  try{
  const {departmentId,subject}=body
  if (!departmentId || !subject){
    return NextResponse.json({
      status:false,
      message:"invalid parameters"
    })
  }
    const newSubject=await prisma.subject.create({
      data:{
        departmentId:departmentId,
        subjectName:subject
      }
    })

    return NextResponse.json(newSubject);

  }

  catch(err){}
}