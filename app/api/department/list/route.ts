import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
export async function GET(req:NextRequest) {

  try{

    const departments= await prisma.department.findMany({include:{ 
      subject:true,
      exam:true}});

    if(!departments){
      return NextResponse.json({message:"department not found"},{status:404})
    }

    return NextResponse.json(departments,{status:200})
  }
  catch(err){

    return NextResponse.json({message:"Something went wrong!"},{status:500})

  }
  
}