import prisma from "@/lib/prismadb"
import { NextRequest, NextResponse } from "next/server";
export async function GET(req:NextRequest) {
  
  try{
    const instructors=await prisma.teacher.findMany({
      include:{
        user:true
      }
    });
    return NextResponse.json(instructors)
  }
  catch(err:any){
    throw new Error(err.message)
  }
}